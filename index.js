const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const posts = require('./routes/posts');
const comments = require('./routes/comments');
const store = require('./store');

let app = express();

app.use(bodyParser.json());
app.use(logger('dev'));

// Use custom middleware to validate post and comment Ids
app.use('/posts/:postId', store.validatePostId);
app.use('/posts/:postId/comments/:commentId', store.validateCommentId);

app.get('/posts', posts.getPosts);
app.post('/posts', posts.addPost);
app.put('/posts/:postId', posts.updatePost);
app.delete('/posts/:postId', posts.deletePost);

app.get('/posts/:postId/comments', comments.getComments);
app.post('/posts/:postId/comments', comments.addComment);
app.put('/posts/:postId/comments/:commentId', comments.updateComment);
app.delete('/posts/:postId/comments/:commentId', comments.deleteComment);

app.listen(3000);
