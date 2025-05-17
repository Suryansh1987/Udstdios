🔍 MERN + OAuth Image Search App
A full-stack image search web application built with the MERN stack. Users can log in via OAuth (Google, GitHub, Facebook), search for images using the Unsplash API, and manage their personal search history. Also includes a global top searches banner and multi-select image functionality.

🚀 Features
OAuth authentication (Google, GitHub, Facebook) using Passport.js

Image search powered by Unsplash API

Top 5 search terms across all users

Multi-select grid view with selection counter

User-specific search history tracking

⚙️ Setup Instructions
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/image-search-oauth.git
cd image-search-oauth
2. Configure Environment Variables
Create a .env file in both /server and /client directories.

📁 /server/.env
ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection
SESSION_SECRET=your_session_secret

# OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret

UNSPLASH_ACCESS_KEY=your_unsplash_access_key
📁 /client/.env
ini
Copy
Edit
REACT_APP_API_BASE=http://localhost:5000
3. Install Dependencies
bash
Copy
Edit
# In the root folder
cd server
npm install

cd ../client
npm install
4. Run the Application
In two terminals:

bash
Copy
Edit
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm start
🧪 API Endpoints
Method	Endpoint	Description
GET	/api/top-searches	Returns top 5 most frequent search terms
POST	/api/search	Searches images and stores search metadata
GET	/api/history	Gets logged-in user’s search history

🧾 Example cURL Commands
Search for Images
bash
Copy
Edit
curl -X POST http://localhost:5000/api/search \
-H "Content-Type: application/json" \
-d '{"term": "sunset"}' \
--cookie "connect.sid=your_session_cookie"
Get Top Searches
bash
Copy
Edit
curl http://localhost:5000/api/top-searches
Get User Search History
bash
Copy
Edit
curl http://localhost:5000/api/history \
--cookie "connect.sid=your_session_cookie"
📸 Visual Proof
✅ OAuth Login
Add Screenshot/GIF Here

🔝 Top Searches Banner
Add Screenshot/GIF Here

🔍 Image Search + Multi-select
Add Screenshot/GIF Here

📜 Search History Section
Add Screenshot/GIF Here

📌 Tech Stack
Frontend:

React.js

Axios

React Router

Backend:

Node.js

Express.js

MongoDB

Passport.js (OAuth strategies)

APIs:

Unsplash API


OAuth Providers (Google, GitHub, Facebook) 
Photos: 
![Screenshot 2025-05-17 170327](https://github.com/user-attachments/assets/042ca2eb-af22-4dea-b012-3ae9dbbd823f)
![Screenshot 2025-05-17 170317](https://github.com/user-attachments/assets/c970b3b8-e75d-4f0a-ba7b-6177e920ab54)
![Screenshot 2025-05-17 170217](https://github.com/user-attachments/assets/2e32c34c-9699-45dc-8ff5-4649c5d3dd6e)
![Screenshot 2025-05-17 170134](https://github.com/user-attachments/assets/d23c2b92-f37b-49c9-95cb-53f7c34d3449)
