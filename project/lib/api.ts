import { APP_SERVER_URL } from './constants';

// Search for images using Unsplash API
export const searchImages = async (query: string) => {
  const response = await fetch(`${APP_SERVER_URL}/api/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to search images');
  }

  return response.json();
};

// Fetch user's search history
export const fetchUserHistory = async () => {
  const response = await fetch(`${APP_SERVER_URL}/api/history`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user history');
  }

  return response.json();
};

// Fetch top searches
export const fetchTopSearches = async () => {
  const response = await fetch(`${APP_SERVER_URL}/api/top-searches`);

  if (!response.ok) {
    throw new Error('Failed to fetch top searches');
  }

  return response.json();
};

// Fetch authentication status
export const fetchAuthStatus = async () => {
  const response = await fetch(`${APP_SERVER_URL}/auth/status`, {
    credentials: 'include',
  });

  if (!response.ok) {
    return { isAuthenticated: false };
  }

  return response.json();
};