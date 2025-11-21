const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

let posts = [];

app.get('/', (req, res) => {
    res.render('home.ejs', { posts: posts });
});

app.get('/compose', (req, res)=> {
    res.render('compose.ejs');
});

app.post('/compose', (req,res) => {
    const post = {
        title : req.body.postTitle,
        content : req.body.postBody
    };
    posts.push(post);
    res.redirect('/');
});

app.get("/posts/:postTitle", (req, res) => {
    const requestedTitle = req.params.postTitle.toLowerCase();
    
    const post = posts.find(p => p.title.toLowerCase() === requestedTitle);
    if (post) {
        res.render("post.ejs", {
            title: post.title,
            content: post.content
        });
    } else {
        res.status(404).send('Post not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});