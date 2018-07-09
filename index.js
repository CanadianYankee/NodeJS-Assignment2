const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const posts = require('./routes/posts');

let app = express();

app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/posts', posts.getPosts);
app.post('/posts', posts.postPosts);
app.put('/posts/:postId', posts.putPosts);
app.delete('/posts/:postId', posts.deletePosts);

app.listen(3000);
