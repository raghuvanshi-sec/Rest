  const express = require('express');
  const app = express();
  const port = 8080; 
  const path = require('path');
  const { v4: uuidv4 } =require('uuid');
  const methodOverride = require('method-override');
  
  
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride('_method'));


  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '/views'));

  app.use(express.static('public'));
 
    let posts = [
    {
        id:uuidv4(),
        username: 'john_doe',
        title:'My First Post',
        content: 'This is the content of my first post.'
    },
    {
        id:uuidv4(),
        username: 'jane_smith',
        title: 'Hello World',
        content: 'Hello everyone! This is my first post.'
    }
    ];

   app.get('/posts', (req, res) => {
    res.render("index.ejs", {posts});
   });

   app.get('/posts/new', (req, res) => {
    res.render("new.ejs");
   });


   app.post('/posts', (req, res) => {
    let {username, content} = req.body;
    let Id= uuidv4();
    posts.push({Id,username, content});
    res.redirect('/posts');
   });


   app.get('/posts/:id', (req, res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p )=> id === p.id);
    res.render("show.ejs", {post: post});
   });

   app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p )=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
   });

   app.get('/posts/:id/edit', (req, res) => {
     let {id} = req.params;
     let post = posts.find((p )=> id === p.id);
     res.render("edit.ejs", {post},);
   });

   app.listen(port, () => {
    console.log(`Server is running on:${port}`);
   });