# ImageHub - MERN Image Search Application

ImageHub is a full-stack MERN application with OAuth authentication that allows users to search for images using the Unsplash API.

## Features

- OAuth authentication with Google, GitHub, and Facebook
- Image search functionality using Unsplash API
- Responsive 4-column grid display for search results
- Multi-select image functionality with dynamic counter
- Top searches banner showing most frequent search terms
- User-specific search history tracking

## Tech Stack

- **Frontend**: Next.js (React), Tailwind CSS, shadcn/ui
- **Backend**: Express.js, MongoDB
- **Authentication**: Passport.js with OAuth
- **Image API**: Unsplash

## Project Structure

```
/
├── app/                # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Home page (login)
│   └── search/         # Search functionality
├── components/         # React components
│   ├── auth/           # Authentication components
│   ├── search/         # Search-related components
│   └── ui/             # UI components (shadcn)
├── contexts/           # React context providers
│   └── AuthContext.tsx # Authentication context
├── lib/                # Utility functions
│   ├── api.ts          # API client functions
│   ├── constants.ts    # Constants
│   └── utils.ts        # Helper functions
├── server/             # Express.js backend
│   ├── config/         # Server configuration
│   ├── controllers/    # Route controllers
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   └── server.js       # Express server entry point
└── ...
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- OAuth credentials (Google, GitHub, Facebook)
- Unsplash API access key

### Environment Variables

1. Create `.env` file in the server directory using the `.env.example` template:

```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
SESSION_SECRET=your_session_secret_here

MONGODB_URI=mongodb://localhost:27017/image-search-app

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

2. Create `.env.local` file in the root directory using the `.env.local.example` template:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
# Start both frontend and backend concurrently
npm run dev:all

# Or start them separately
npm run dev        # Frontend (Next.js)
npm run dev:server # Backend (Express)
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Documentation

### Authentication

- `GET /auth/google`: Initiates Google OAuth flow
- `GET /auth/github`: Initiates GitHub OAuth flow
- `GET /auth/facebook`: Initiates Facebook OAuth flow
- `GET /auth/status`: Checks authentication status
- `GET /auth/logout`: Logs out the current user

### Search & History

- `POST /api/search`: Searches for images and records search term
  - Body: `{ "query": "search term" }`
- `GET /api/history`: Gets current user's search history
- `GET /api/top-searches`: Gets top 5 most frequent search terms

## Example API Requests

### Search for images

```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"nature"}' \
  --cookie "connect.sid=your_session_cookie"
```

### Get user's search history

```bash
curl -X GET http://localhost:5000/api/history \
  --cookie "connect.sid=your_session_cookie"
```

### Get top searches

```bash
curl -X GET http://localhost:5000/api/top-searches
```

## Screenshots

![Login Page](https://via.placeholder.com/800x450?text=Login+Page)
![Search Results](https://via.placeholder.com/800x450?text=Search+Results)
![Image Selection](https://via.placeholder.com/800x450?text=Image+Selection)
![Search History](https://via.placeholder.com/800x450?text=Search+History)

## License

This project is licensed under the MIT License.