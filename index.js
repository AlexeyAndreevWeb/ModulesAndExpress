import express from "express";
import fs from "fs";
import path from "path";

const PORT = 8080;
const app = express();
const __dirname = path.resolve();
const pathToFile = path.resolve(__dirname, "count.json");
const file = fs.readFileSync(pathToFile, "utf8");

const pageTransitions = {
  home: JSON.parse(file).home,
  about: JSON.parse(file).about,
};

app.get("/", (req, res) => {
  pageTransitions.home++;
  res.send(
    `<h1>Home</h1><a href="/about">link in About</a><p>Home Count: ${pageTransitions.home}</p>`
  );
  fs.writeFileSync(pathToFile, JSON.stringify(pageTransitions), {
    encoding: "utf8",
    flag: "w",
  });
});

app.get("/about", (req, res) => {
  pageTransitions.about++;
  res.send(
    `<h1>About</h1> <a href="/">link in Home</a><p>About Count: ${pageTransitions.about}</p>`
  );
  fs.writeFileSync(pathToFile, JSON.stringify(pageTransitions), {
    encoding: "utf8",
    flag: "w",
  });
});

app.listen(PORT, () => console.log(`Started http://localhost:${PORT}`));
