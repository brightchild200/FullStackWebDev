# Family Travel Tracker

A full-stack web application that allows multiple users to track and visualize countries they've visited. Built with Node.js, Express, EJS, and PostgreSQL.

## Features

- **Multi-user support**: Create and switch between multiple user profiles
- **Country tracking**: Add visited countries to your personal travel map
- **Visual map**: See a dynamic visualization of all countries visited
- **User profiles**: Each user has a unique color and list of visited countries
- **Persistent storage**: Data saved in PostgreSQL database

## Tech Stack

- **Frontend**: EJS (Embedded JavaScript templating), HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Middleware**: body-parser for form data parsing

## Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- PostgreSQL database
- npm (Node Package Manager)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/brightchild200/Family-Travel-Tracker.git
   cd Family-Travel-Tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Create a PostgreSQL database named `udemy`
   - Run the following SQL commands to create tables:

   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     color VARCHAR(50)
   );

   CREATE TABLE countries (
     id SERIAL PRIMARY KEY,
     country_name VARCHAR(100) NOT NULL,
     country_code VARCHAR(3) UNIQUE NOT NULL
   );

   CREATE TABLE visited_countries (
     id SERIAL PRIMARY KEY,
     country_code VARCHAR(3) NOT NULL,
     user_id INTEGER NOT NULL,
     FOREIGN KEY (user_id) REFERENCES users(id)
   );
   ```

4. **Configure environment variables** (optional)
   - Create a `.env` file in the root directory:
   ```
   DATABASE_URL=postgres://postgres:password@localhost:5433/udemy
   PORT=3000
   NODE_ENV=development
   ```

## Running Locally

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The app will start at `http://localhost:3000`

## Project Structure

```
Family-Travel-Tracker/
├── index.js              # Main server file
├── package.json          # Dependencies and scripts
├── public/               # Static assets
│   └── styles/
│       ├── main.css      # Main stylesheet
│       └── new.css       # New user form styles
└── views/                # EJS templates
    ├── index.ejs         # Main page
    └── new.ejs           # New user creation page
```

## Usage

1. **Create a user profile**: Click "Add New User" to create a profile with a name and color
2. **Switch users**: Select a different user from the dropdown to see their travel map
3. **Add a country**: Enter a country name and click "Add" to mark it as visited
4. **View progress**: See the total number of countries visited and a visual map

## API Endpoints

- `GET /` - Main page displaying the travel map
- `POST /add` - Add a visited country for the current user
- `POST /user` - Switch between users or show new user form
- `POST /new` - Create a new user profile

## Environment Variables

Create a `.env` file in the root directory for local development:

```
DATABASE_URL=postgresql://postgres:PASSWORD@db.YOUR_SUPABASE_URL:5432/postgres
SUPABASE_URL=https://YOUR_SUPABASE_URL.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
NODE_ENV=development
PORT=3000
```

**Note:** `.env` is in `.gitignore` and won't be committed to GitHub.

For Vercel deployment, set these environment variables in Vercel dashboard:
- `DATABASE_URL` - Your Supabase PostgreSQL connection string
- `NODE_ENV=production` - Enables SSL for database connections

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Run tests (not yet configured)

## Dependencies

- **express** - Web server framework
- **ejs** - Templating engine
- **body-parser** - Middleware for parsing request bodies
- **pg** - PostgreSQL client
- **nodemon** - Development auto-reload tool

## Future Improvements

- Add authentication and user accounts
- Implement admin panel for managing users
- Add map library for interactive country visualization
- Export travel history to PDF
- Add total miles traveled calculation
- Mobile-responsive design

## License

ISC


