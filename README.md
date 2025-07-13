## Node.js + SQLite3 Demo app
- Used SQLite for cache data locally
Fetches from third-party API on first request

## How to run
1. Install dependencies
npm install

2. Start the server
npm start

[OPTIONAL] Start server with nodemon 
npm run dev

3. Test the API
- http://localhost:3000/users
- http://localhost:3000/users/1

## API Endpoints

1. GET /users Get all users
2. GET /users/:id Get user details

## Dependencies
- express
- sqlite3
- axios