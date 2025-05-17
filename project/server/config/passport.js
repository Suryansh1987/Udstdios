const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists
    let user = await User.findOne({ providerId: profile.id, provider: 'google' });
    
    if (user) {
      return done(null, user);
    }
    
   
    user = new User({
      providerId: profile.id,
      provider: 'google',
      displayName: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos[0].value
    });
    
    await user.save();
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/auth/github/callback',
  scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
  
    let user = await User.findOne({ providerId: profile.id, provider: 'github' });
    
    if (user) {
      return done(null, user);
    }
    
   
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.username}@github.com`;
    
    user = new User({
      providerId: profile.id,
      provider: 'github',
      displayName: profile.displayName || profile.username,
      email: email,
      photo: profile.photos[0].value
    });
    
    await user.save();
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));


passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
   
    let user = await User.findOne({ providerId: profile.id, provider: 'facebook' });
    
    if (user) {
      return done(null, user);
    }
    
    
    user = new User({
      providerId: profile.id,
      provider: 'facebook',
      displayName: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos[0].value
    });
    
    await user.save();
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

module.exports = passport;