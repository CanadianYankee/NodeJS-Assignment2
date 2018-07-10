// The world's dumbest database 
let data = {
    posts: [],
    postFields: ['name', 'url', 'text'], 
    isValidPostId(id) { return !isNaN(Number.parseInt(id)) && id >= 0 && id < this.posts.length; },
    isValidCommentId(postId, commentId) { 
        return this.isValidPostId(postId) && !isNaN(Number.parseInt(commentId)) && 
        commentId >= 0 && commentId < this.posts[postId].comments.length; 
    }
};

module.exports = { 
    get posts() { return data.posts; }, 
    get postFields() { return data.postFields; },

    isValidPostId(postId) { return data.isValidPostId(postId); },
    isValidCommentId(postId, commentId) { return data.isValidCommentId(postId, commentId); },

    // Middleware for validating postId and commentId
    validatePostId(request, response, next) {
        if(!data.isValidPostId(request.params.postId)) {
            response.status(404).send({error: 'Invalid postId'});
        } else {
            next();
        }
    },

    validateCommentId(request, response, next) {
        if(!data.isValidCommentId(request.params.postId, request.params.commentId)) {
            response.status(404).send({error: 'Invalid commentId'});
        } else {
            next();
        }
    }
};
