import "dotenv/config.js";
import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";
const { Pool } = pkg;
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Use a Pool and reuse across lambda invocations (important for serverless)
if (!globalThis.__pgPool) {
  globalThis.__pgPool = new Pool({
    connectionString:
      process.env.DATABASE_URL || "postgres://postgres:riya@127.0.0.1:5433/udemy",
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });
}
const db = globalThis.__pgPool;

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1;",
    [currentUserId]
  );
  return result.rows.map((r) => r.country_code);
}

async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const currentUser = await getCurrentUser();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser ? currentUser.color : "teal",
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const currentUser = await getCurrentUser();

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data && data.country_code;
    if (!countryCode) {
      return res.redirect("/");
    }
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  try {
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
      [name, color]
    );

    const id = result.rows[0].id;
    currentUserId = id;
  } catch (err) {
    console.log(err);
  }

  res.redirect("/");
});

export default app;
