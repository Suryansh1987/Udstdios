const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');
const Search = require('../models/Search');

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

// Search images from Unsplash
router.post('/search', isAuthenticated, async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Store search term in user's history
    await User.findByIdAndUpdate(
      req.user._id,
      { 
        $push: { 
          searchHistory: { 
            term: query,
            timestamp: new Date() 
          } 
        } 
      }
    );

    // Update or create search term in the Search collection
    const existingSearch = await Search.findOne({ 
      term: query.toLowerCase(),
      userId: req.user._id
    });

    if (existingSearch) {
      existingSearch.count += 1;
      existingSearch.updatedAt = new Date();
      await existingSearch.save();
    } else {
      await Search.create({
        term: query.toLowerCase(),
        userId: req.user._id
      });
    }

    // Search Unsplash API
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        per_page: 28,
        client_id: process.env.UNSPLASH_ACCESS_KEY
      }
    });

    return res.status(200).json({
      results: response.data.results,
      total: response.data.total,
      query
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get user's search history
router.get('/history', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Sort by timestamp in descending order (newest first)
    const history = user.searchHistory.sort((a, b) => b.timestamp - a.timestamp);
    
    return res.status(200).json({ history });
  } catch (error) {
    console.error('History error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get top searches across all users
router.get('/top-searches', async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      { $group: { _id: '$term', count: { $sum: '$count' } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: { _id: 0, term: '$_id', count: 1 } }
    ]);
    
    return res.status(200).json({ topSearches });
  } catch (error) {
    console.error('Top searches error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;