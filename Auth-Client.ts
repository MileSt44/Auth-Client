import express from "express";
import path from "path";

const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/sample", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "sample.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));