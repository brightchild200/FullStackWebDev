import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const countNum  = req.body["fName"].length + req.body["lName"].length;
  console.log(countNum);
res.render("index.ejs", {count: countNum});
  // res.send(`Total number of characters in your name is: ${countNum}`);

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
