PetBuddy - Full application (Express API + static client)
Run steps:
1. Unzip and go to server folder:
   cd petbuddy_release/server
2. Install dependencies:
   npm install
3. Seed database (optional):
   npm run seed
4. Start server:
   npm start
5. Open http://localhost:5000 in browser

Notes:
- MongoDB must be running locally or set MONGO_URI in server/.env to your MongoDB Atlas URI.
- Admin user created by seed: admin@petbuddy.test / admin123
