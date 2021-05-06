const fs = require("fs");
const posts = require("./posts.json");
const express = require("express");

const app = express();

app.use(express.json());

app.post("/posts", (req, res) => {
  posts.push(req.body);
  let stringedData = JSON.stringify(posts, null, 2);

  fs.writeFile("posts.json", stringedData, (err) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
  });

  return res.status(201).json({ message: "new post created" });
});

app.listen(3000, () => console.log("Server is up and running."));
