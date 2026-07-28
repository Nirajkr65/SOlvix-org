SOLVIX PROJECT EXPLANATION
==========================

Project Name: SOLVIX
Project Type: Full-stack competitive programming and coding practice platform
Frontend: React, Vite, Redux Toolkit, Tailwind CSS, Monaco Editor
Backend: Node.js, Express.js, MongoDB, Redis, JWT authentication
External Services: Judge0, Google Gemini AI, Cloudinary, email/OTP service


1. PROJECT OVERVIEW
-------------------

SOLVIX is a full-stack coding practice platform inspired by platforms like LeetCode, Codeforces practice pages, and coding interview preparation tools.

The main purpose of this project is to help users:

- Create an account and log in securely.
- Browse coding problems.
- Filter problems by difficulty, tag, solved status, and search keyword.
- Open a full coding editor for each problem.
- Write and run code in supported languages.
- Submit code against hidden test cases.
- Track solved problems and submission activity.
- Ask an AI assistant for hints and explanations.
- Write private notes for problems.
- Participate in problem discussions.
- Share community solutions.
- View public user profiles and activity.
- Allow admins to create, update, delete, and manage problems.
- Allow admins to upload solution videos.

In simple words, SOLVIX is not only a problem-solving website. It combines coding practice, AI mentorship, notes, discussion, editorials, video learning, and profile analytics in one platform.


2. HIGH LEVEL ARCHITECTURE
--------------------------

The project has two main folders:

frontend/
  This is the client application built using React and Vite.

backend/
  This is the API server built using Node.js and Express.

The frontend communicates with the backend using Axios.

Request flow:

User clicks something in React UI
-> React component dispatches Redux action or calls Axios
-> Axios sends request to backend API
-> Express route receives request
-> Middleware checks authentication if required
-> Controller performs business logic
-> MongoDB stores or fetches data
-> External APIs like Judge0, Gemini, or Cloudinary may be called
-> Backend sends JSON response
-> React updates UI


3. FRONTEND EXPLANATION
-----------------------

The frontend is located in:

frontend/src

Important frontend files:

- frontend/src/main.jsx
  Entry point of the React application.

- frontend/src/App.jsx
  Defines application routes and protected pages.

- frontend/src/authSlice.js
  Redux Toolkit slice for authentication actions like register, login, logout, check auth, update profile, send OTP, verify email, and change password.

- frontend/src/utils/axiosClient.js
  Central Axios instance. It uses VITE_API_BASE_URL from frontend/.env and sends cookies using withCredentials: true.

- frontend/src/stores/store.js
  Redux store configuration. It combines auth, chat, and notes reducers.


4. MAIN FRONTEND PAGES
----------------------

LandingPage.jsx
  This is the first public page shown at "/". It introduces the platform.

SignUp.jsx
  This page contains the create account form. It uses:
  - react-hook-form for form handling
  - zod for validation
  - Redux registerUser action to call backend /user/register

  Fields:
  - firstName
  - emailId
  - password

  Password rule:
  At least 8 characters with uppercase, lowercase, number, and special character.

Login.jsx
  This page logs in an existing user using emailId and password.
  It dispatches loginUser from authSlice.

HomePage.jsx
  This is the problem list page at "/problems".
  It fetches all problems from:
  GET /problem/getAllProblems

  It also fetches solved problems from:
  GET /problem/problemSolvedByUser

  Features:
  - Search problems
  - Filter by status: all, solved, unsolved
  - Filter by difficulty: easy, medium, hard
  - Filter by tags
  - Show total problem count
  - Show solved count

ProblemEditor.jsx
  This is the main coding workspace.

  Features:
  - Monaco code editor
  - Language selection: C++, Java, JavaScript
  - Problem description
  - Visible test cases
  - Run code button
  - Submit code button
  - Submission results
  - Submission history
  - AI chat assistant
  - Notes panel
  - Editorial section
  - Discussion section
  - Community solutions
  - Resizable layout

UserProfile.jsx
  Shows public profile and own profile information.

  Features:
  - User details
  - Bio
  - Email verification
  - Password change
  - Solved count
  - Submission stats
  - Difficulty-wise solved count
  - Activity heatmap
  - Recent submissions

Admin.jsx and Admin Components
  Admin-only section for managing the platform.

  Admin can:
  - Create problems
  - Update problems
  - Delete problems
  - Upload solution videos
  - Manage users
  - Create another admin


5. BACKEND EXPLANATION
----------------------

The backend is located in:

backend/src

Important backend files:

- backend/src/index.js
  Main Express server file.

- backend/src/config/db.js
  MongoDB connection file using Mongoose.

- backend/src/config/redis.js
  Redis client configuration.

- backend/src/routes/
  Contains all API route definitions.

- backend/src/controllers/
  Contains the actual business logic for each route.

- backend/src/models/
  Contains MongoDB schemas.

- backend/src/middleware/
  Contains authentication and admin authorization middleware.


6. BACKEND SERVER FLOW
----------------------

backend/src/index.js does the following:

1. Loads environment variables using dotenv.
2. Creates Express app.
3. Enables CORS with frontend origin.
4. Enables JSON body parsing.
5. Enables cookie parsing.
6. Registers route groups:
   - /user
   - /problem
   - /submission
   - /ai
   - /video
   - /discussion
   - /editorial
   - /solutions
   - /notes
   - /profile
7. Connects to MongoDB.
8. Tries to connect to Redis.
9. Starts server on process.env.PORT.

Important note:
Redis is used mainly for token blocklisting during logout. The server should still be able to run when Redis is unavailable, although logout token blocklist protection becomes limited.


7. AUTHENTICATION SYSTEM
------------------------

Authentication is handled through:

Frontend:
  frontend/src/authSlice.js

Backend:
  backend/src/routes/userAuth.js
  backend/src/controllers/userAuthenticate.js
  backend/src/middleware/userMiddleware.js
  backend/src/middleware/adminMiddleware.js

Authentication flow:

Register:
  1. User submits name, email, and password.
  2. Frontend sends POST /user/register.
  3. Backend validates fields.
  4. Password is hashed using bcrypt.
  5. A username is generated.
  6. User is saved in MongoDB.
  7. JWT token is created.
  8. Token is stored in an HTTP cookie.
  9. Frontend stores user in Redux state.

Login:
  1. User submits email and password.
  2. Backend finds user by email.
  3. Password is compared using bcrypt.
  4. JWT token is created.
  5. Token is sent as cookie.
  6. User is marked authenticated in frontend Redux.

Check Auth:
  1. Frontend calls GET /user/check on app load.
  2. userMiddleware verifies JWT cookie.
  3. If valid, backend returns current user.

Logout:
  1. User calls POST /user/logout.
  2. Backend decodes token.
  3. If Redis is available, token is stored in Redis blocklist until expiry.
  4. Cookie is cleared.

Admin Access:
  adminMiddleware checks:
  - Valid JWT token
  - User exists
  - role is admin


8. DATABASE MODELS
------------------

User Model
  File: backend/src/models/user.js

  Stores:
  - firstName
  - lastName
  - emailId
  - username
  - bio
  - age
  - password
  - role: admin or user
  - problemSolved
  - authProvider
  - isEmailVerified
  - email verification fields

Problem Model
  File: backend/src/models/problems.js

  Stores:
  - title
  - description
  - difficulty
  - tags
  - visibleTestCases
  - hiddenTestCases
  - startCode
  - problemCreator
  - referenceSolution

Submission Model
  Stores submitted code and execution result.

  Typical fields:
  - userId
  - problemId
  - code
  - language
  - status
  - runtime
  - memory
  - testCasesPassed
  - testCasesTotal

Note Model
  Stores user-specific notes for each problem.

Discussion Model
  Stores problem discussions, replies, upvotes, and downvotes.

UserSolution Model
  Stores community-shared solutions and comments.

Editorial Model
  Stores editorial content for a problem.

SolutionVideo Model
  Stores Cloudinary video metadata for problem solution videos.


9. PROBLEM MANAGEMENT
---------------------

Routes:

POST /problem/create
  Admin creates a new problem.

PUT /problem/update/:id
  Admin updates an existing problem.

DELETE /problem/delete/:id
  Admin deletes a problem.

GET /problem/problemById/:id
  User fetches full problem details.

GET /problem/getAllProblems
  User fetches problem list.

GET /problem/problemSolvedByUser
  User fetches solved problems.

GET /problem/submittedProblem/:pid
  User fetches submissions for a problem.

GET /problem/getSubmissionStats
  User fetches accepted submission activity for heatmap.

Important logic:

When admin creates or updates a problem, backend validates the reference solutions by running them on Judge0 against visible test cases. If reference solutions fail, problem creation/update is rejected.


10. CODE EXECUTION AND SUBMISSION SYSTEM
----------------------------------------

Routes:

POST /submission/run/:id
  Runs code against visible test cases only.

POST /submission/submit/:id
  Submits code against hidden test cases and stores result.

Technology:
  Judge0 API through RapidAPI.

Supported languages:
  - C++
  - Java
  - JavaScript

Language IDs:
  - C++: 105
  - Java: 91
  - JavaScript: 102

Run Code Flow:

1. User writes code in Monaco Editor.
2. User clicks Run.
3. Frontend sends code, language, and problemId.
4. Backend loads visible test cases.
5. Backend sends batch submissions to Judge0.
6. Backend polls Judge0 using returned tokens.
7. Backend returns success/failure, runtime, memory, and test case results.

Submit Code Flow:

1. User clicks Submit.
2. Backend creates a pending Submission record.
3. Backend sends code to Judge0 with hidden test cases.
4. Backend receives results.
5. Submission status is updated.
6. If accepted, problemId is added to user's problemSolved list.
7. Frontend shows accepted/rejected result.


11. AI CHAT ASSISTANT
---------------------

Route:

POST /ai/chat

Files:
  backend/src/routes/aiChatting.js
  backend/src/controllers/solveDoubt.js
  frontend/src/Components/ChatAI.jsx
  frontend/src/chatSlice.js

Technology:
  Google Gemini API using @google/genai.

Purpose:
  The AI assistant helps users with the current coding problem.

Context sent to AI:
  - Problem title
  - Problem description
  - Test cases
  - Starter code
  - Selected language
  - Conversation messages

Behavior:
  - Gives hints by default.
  - Explains approaches.
  - Reviews code.
  - Helps debug.
  - Provides full solution only when user asks.
  - Restricts answers to DSA/coding context.


12. NOTES FEATURE
-----------------

Routes:

GET /notes
  List all notes for current user.

GET /notes/:problemId
  Get note for a specific problem.

POST /notes/:problemId
  Create or update note.

DELETE /notes/:problemId
  Delete note.

Purpose:
  Users can maintain private notes for each problem. This helps with revision and interview preparation.


13. DISCUSSION FEATURE
----------------------

Routes:

POST /discussion/:problemId
  Create a top-level discussion.

GET /discussion/:problemId
  Get discussions for a problem.

POST /discussion/reply/:discussionId
  Add reply to a discussion.

PUT /discussion/vote/:discussionId
  Like or dislike a discussion.

DELETE /discussion/:discussionId
  Delete a discussion.

Purpose:
  Users can discuss problem approaches, ask questions, reply to others, and vote on useful discussions.


14. COMMUNITY SOLUTIONS
-----------------------

Routes:

POST /solutions/:problemId
  Share a solution for a problem.

GET /solutions/problem/:problemId
  Get all shared solutions for a problem.

GET /solutions/:solutionId
  Get one solution in detail.

PUT /solutions/vote/:solutionId
  Vote on a solution.

POST /solutions/comment/:solutionId
  Comment on a solution.

DELETE /solutions/:solutionId
  Delete a solution.

Purpose:
  This lets users learn from each other after solving or while studying a problem.


15. EDITORIAL FEATURE
---------------------

Routes:

POST /editorial/:problemId
  Create or update editorial content.

GET /editorial/:problemId
  Fetch editorial for a problem.

Purpose:
  Editorials provide official explanations, approaches, and learning material for problems.


16. VIDEO SOLUTIONS
-------------------

Routes:

GET /video/create/:problemId
  Admin gets signed upload credentials for Cloudinary.

POST /video/save
  Admin saves uploaded video metadata.

DELETE /video/delete/:problemId
  Admin deletes solution video.

GET /video/all
  Admin fetches all uploaded videos.

Technology:
  Cloudinary.

Flow:
  1. Admin selects a problem.
  2. Backend generates signed Cloudinary upload data.
  3. Frontend uploads video directly to Cloudinary.
  4. Frontend sends video metadata back to backend.
  5. Backend verifies the Cloudinary resource.
  6. Metadata is saved in MongoDB.
  7. Problem page can show attached video solution.


17. PROFILE AND ACTIVITY SYSTEM
-------------------------------

Routes:

GET /profile/:username
  Public profile page.

GET /profile/:username/activity
  Public activity heatmap data.

GET /profile/check-username/availability
  Check username availability.

POST /profile/username
  Set or update username.

POST /profile/bio
  Set or update bio.

Profile shows:
  - Name
  - Username
  - Bio
  - Email verification status
  - Joined date
  - Solved count
  - Total submissions
  - Accepted submissions
  - Success rate
  - Difficulty-wise solved count
  - Global rank
  - Recent submissions
  - Activity heatmap


18. EMAIL VERIFICATION AND PASSWORD MANAGEMENT
----------------------------------------------

Routes:

POST /user/send-otp
  Sends OTP to logged-in user's email.

POST /user/verify-email
  Verifies OTP.

POST /user/changepassword
  Changes password.

Purpose:
  Adds account security and profile trust.


19. ADMIN FEATURES
------------------

Admin role is stored in the user model:

role: "admin" or "user"

Admin-only features:

- Create coding problems.
- Update problems.
- Delete problems.
- Upload solution videos.
- Delete solution videos.
- View video library.
- Create admin accounts.
- Manage users.

Admin protection:
  backend/src/middleware/adminMiddleware.js


20. ENVIRONMENT VARIABLES
-------------------------

Frontend .env:

VITE_API_BASE_URL
  Example: http://localhost:4000

VITE_GOOGLE_CLIENT_ID
  Google OAuth client ID, if Google sign-in is enabled.

Backend .env:

PORT
  Backend server port. Example: 4000

DB_CONNECTION_STRING
  MongoDB connection string.

JWT_KEY
  Secret key used to sign JWT tokens.

REDIS_PD
  Redis password.

REDIS_HOST
  Redis host.

REDIS_PORT
  Redis port.

JUDGE0_KEY
  RapidAPI key for Judge0.

JUDGE0_URL
  Judge0 API URL.

JUDGE0_HOST
  Judge0 RapidAPI host.

GEMINI_API_KEY
  Google Gemini API key.

CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
  Cloudinary credentials.

FRONTEND_URL
  Frontend origin allowed by CORS.

EMAIL_USER
EMAIL_PASS
BREVO_API_KEY
  Email service credentials.


21. HOW TO RUN THE PROJECT LOCALLY
----------------------------------

Step 1: Install backend dependencies

cd backend
npm install

Step 2: Install frontend dependencies

cd frontend
npm install

Step 3: Configure backend .env

Required minimum for auth and problem browsing:

PORT=4000
DB_CONNECTION_STRING=your_mongodb_connection_string
JWT_KEY=your_secret_key
FRONTEND_URL=http://localhost:5173

Optional but needed for full features:

Redis credentials for logout blocklist.
Judge0 credentials for run/submit code.
Gemini key for AI chat.
Cloudinary credentials for video uploads.
Email credentials for OTP.

Step 4: Configure frontend .env

VITE_API_BASE_URL=http://localhost:4000

Step 5: Start backend

cd backend
npm start

Step 6: Start frontend

cd frontend
npm run dev

Step 7: Open frontend URL

Usually:

http://localhost:5173


22. CURRENT SIGNUP ISSUE DIAGNOSIS
----------------------------------

You said the project was not opened for 3 to 4 months and clicking "Create Account" does nothing.

After checking the project:

1. The frontend is configured to call:
   http://localhost:4000/

2. Backend environment keys are present.

3. MongoDB connection reached "DB Connected" during the network-enabled backend startup check.

4. Redis failed with:
   getaddrinfo ENOTFOUND redis-16805.crce292.ap-south-1-2.ec2.cloud.redislabs.com

This means MongoDB is currently reachable, but the Redis database endpoint is broken or deleted.

Most likely reason:
  The old Redis Cloud database was deleted, suspended, renamed, or its hostname changed after months of inactivity.

Why signup looked like nothing happened:
  The old frontend did not show the real registration error on the signup page. If backend failed or API request failed, the user saw no useful message.

Fix already applied:

- Signup and login pages now show backend/auth errors.
- authSlice now correctly handles string error messages from backend.
- Backend no longer refuses to start just because Redis is unavailable.
- Redis calls are guarded with redisClient.isReady.

Remaining action:
  Create a new Redis database or update REDIS_HOST, REDIS_PORT, and REDIS_PD in backend/.env with the current Redis credentials.

If Redis is not needed immediately:
  The app can run without Redis after the fallback change, but logout token blocklisting will not work until Redis is fixed.


23. DEMO FLOW FOR PRESENTATION
------------------------------

Recommended presentation order:

1. Start with the problem statement:
   "Many students need a single platform where they can practice coding, run code, get AI guidance, maintain notes, and track progress."

2. Show landing page:
   Explain SOLVIX as an AI-powered coding practice platform.

3. Show signup/login:
   Explain JWT authentication, bcrypt password hashing, and cookies.

4. Show problem list:
   Explain filters, search, solved status, and difficulty categories.

5. Open a problem:
   Explain problem description, visible test cases, and starter code.

6. Show Monaco editor:
   Explain multi-language support.

7. Run code:
   Explain visible test case execution through Judge0.

8. Submit code:
   Explain hidden test cases, submission storage, accepted/rejected result.

9. Show AI assistant:
   Explain Gemini integration and context-aware hints.

10. Show notes:
   Explain private notes for revision.

11. Show discussions and solutions:
   Explain collaborative learning.

12. Show profile:
   Explain stats, activity heatmap, solved count, and rank.

13. Show admin panel:
   Explain problem creation, validation using Judge0, and video upload.

14. End with architecture:
   React frontend, Express backend, MongoDB database, Redis blocklist, Judge0 execution, Gemini AI, Cloudinary media.


24. PRESENTATION SCRIPT
-----------------------

You can say:

"SOLVIX is a full-stack competitive programming platform designed to make coding practice more interactive and guided. Users can register, log in, solve coding problems, run code against sample test cases, submit code against hidden test cases, and track their progress."

"The frontend is built using React and Vite. I used Redux Toolkit for global state management, React Hook Form and Zod for form validation, Tailwind CSS for styling, and Monaco Editor for the coding interface."

"The backend is built using Node.js and Express. MongoDB stores users, problems, submissions, notes, discussions, solutions, editorials, and video metadata. JWT cookies are used for authentication, and bcrypt is used for password hashing."

"For code execution, I integrated Judge0. When a user runs code, it is tested against visible test cases. When the user submits, it is tested against hidden test cases and the result is stored in MongoDB."

"The platform also includes an AI assistant powered by Google Gemini. The assistant receives the current problem context and helps users with hints, debugging, approaches, and complexity analysis."

"Admins can create problems, and before saving a problem the backend validates the reference solutions using Judge0. This prevents invalid problems from being added."

"The project also supports notes, discussions, community solutions, public profiles, activity heatmaps, email verification, and Cloudinary-based solution videos."


25. TECHNICAL HIGHLIGHTS
------------------------

- Full-stack MERN-style architecture.
- JWT cookie authentication.
- Password hashing using bcrypt.
- Protected routes with user and admin middleware.
- Redux Toolkit async thunks for API flows.
- Form validation using Zod.
- Code editor using Monaco Editor.
- Code execution using Judge0 batch API.
- AI assistant using Google Gemini.
- MongoDB aggregation for profile stats and activity.
- Cloudinary signed upload flow for videos.
- Redis token blocklist support for logout.
- Modular Express route/controller/model structure.


26. LIMITATIONS AND FUTURE IMPROVEMENTS
---------------------------------------

Possible improvements:

- Add refresh tokens for longer sessions.
- Add better error response format across all backend APIs.
- Add automated tests.
- Add pagination to problem list.
- Improve discussion sorting by most liked.
- Add Docker setup for easier deployment.
- Add local Redis fallback for development.
- Add better admin analytics.
- Add Google sign-in if OAuth flow is fully enabled.
- Add leaderboard page.
- Add problem bookmarks.
- Add code autosave.


27. CONCLUSION
--------------

SOLVIX is a production-style full-stack coding platform. It covers authentication, problem solving, code execution, AI assistance, notes, discussions, profiles, admin tools, and video learning.

The project demonstrates:

- Frontend development with React.
- Backend API design with Express.
- Database modeling with MongoDB.
- Authentication and authorization.
- Third-party API integrations.
- Real-world error handling.
- Admin and user role separation.
- Scalable modular code structure.

This makes SOLVIX a strong project to present as a complete full-stack application rather than just a simple CRUD website.

