import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = []

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs", {posts})
  });

app.get("/create", (req, res) => {
    res.render("create.ejs")
})

app.post("/create", (req, res) => {
    const {title, content} = req.body
    const newPost = {id : posts.length + 1, title, content}
    posts.push(newPost)
    res.redirect("/")
})

app.get("/edit/:id", (req, res) => {
    const postID = parseInt(req.params.id)
    const post = posts.find(post => post.id === postID)
    res.render("edit.ejs", {post})
})

app.post("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const index = posts.findIndex(post => post.id === postId);
    posts[index] = { id: postId, title, content };
    res.redirect('/');
})

app.post("/delete/:id", (req, res) => {
    const postId = parseInt(req.params.id)
    posts = posts.filter(post => post.id !== postId)
    res.redirect("/")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});