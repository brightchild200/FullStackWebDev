import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "udemy",
  password: "riya",
  port: 5433,
});

let quiz = [
  { country: "France", capital: "Paris" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States of America", capital: "New York" },
];

// We'll try to load quiz rows from the DB at startup. If the DB
// connection fails (for example wrong password), we log a helpful
// message and continue using the fallback `quiz` array so the app
// doesn't crash.

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// set view engine before routes use `res.render`
app.set("view engine", "ejs");

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

async function init() {
  try {
    await db.connect();
    const result = await db.query("SELECT * FROM capitals");
    if (result && result.rows && result.rows.length) {
      quiz = result.rows;
      console.log(`Loaded ${quiz.length} quiz items from DB.`);
    } else {
      console.log("No rows returned from DB; using default quiz.");
    }
  } catch (err) {
    console.error("Error connecting/querying DB:", err.message || err);
    if (err.code === '28P01') {
      console.error("Postgres authentication failed. Check your DB user/password or set connection via environment variables (PGUSER/PGPASSWORD).\nExample: set PGPASSWORD=yourpassword; nodemon");
    }
    console.error("Continuing with fallback quiz data.");
  }

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

init();
