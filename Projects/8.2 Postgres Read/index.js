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

let quiz = [];
let totalCorrect = 0;
let currentQuestion = {};

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  if (!quiz || quiz.length === 0) {
    return res.status(500).send("Quiz data not loaded. Try again later.");
  }
  nextQuestion();
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  const raw = req.body.answer || "";
  let answer = raw.trim();
  let isCorrect = false;

  const correctCapital = (currentQuestion && currentQuestion.capital) || "";
  if (correctCapital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    isCorrect = true;
  }

  if (!quiz || quiz.length === 0) {
    return res.status(500).send("Quiz data not loaded. Try again later.");
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

function nextQuestion() {
  if (!quiz || quiz.length === 0) {
    currentQuestion = {};
    return;
  }
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

// Load quiz data from DB then start server
async function start() {
  try {
    await db.connect();
    const res = await db.query("SELECT * FROM flags");
    quiz = res.rows || [];
    await db.end();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server - DB error:", err);
    process.exit(1);
  }
}

start();
