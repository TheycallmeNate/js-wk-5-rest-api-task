const fs = require("fs");
const posts = require("./posts.json");
const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Post request to create a new post
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

// Get request to fetch all posts
app.get("/posts", (req, res) => res.status(200).json({ posts }));

// Get request to fetch a single post by id parameter
app.get("/posts/:id", (req, res) => {
  let id = req.params.id;
  let foundPost = posts.find((post) => String(post.id) === id);

  if (foundPost) {
    return res.status(200).json({ post: foundPost });
  } else {
    return res.status(404).json({ message: "post not found" });
  }
});

app.listen(3000, () => console.log("Server is up and running."));
