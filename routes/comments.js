const store = require('../store');

module.exports = {
    getComments(request, response) {
        // Make sure id is in range
        if(store.isValidPostId(request.params.postId))
        {
            // Get all comments unless a commentId was queried
            if('commentId' in request.query) {
                if(store.isValidCommentId(request.params.postId, request.query.commentId)) {
                    response.status(200).send(store.posts[request.params.postId].comments[request.query.commentId]);
                } else {
                    response.sendStatus(400);
                }
            } else {
                response.status(200).send(store.posts[request.params.postId].comments);
            }
        } else {
            response.sendStatus(400);
        }
    },

    addComment(request, response) {
        // Make sure id is in range
        if(store.isValidPostId(request.params.postId))
        {
            let postId = request.params.postId;
            // Make sure that the comment array exists
            if(!Array.isArray(store.posts[postId].comments)) {
                store.posts[postId].comments = [];
            }
            let commentId = store.posts[postId].comments.length;
            // We only care about the "text" propery
            store.posts[postId].comments.push({text: request.body.text});
            response.status(201).send({commentId: commentId});
        } else {
            response.sendStatus(400);
        }        
    },

    updateComment(request, response) {
        // Make sure ids are in range
        if(store.isValidCommentId(request.params.postId, request.params.commentId))
        {
            // We only care about the "text" propery
            store.posts[request.params.postId].comments[request.params.commentId].text = request.body.text;
            response.sendStatus(204);
        } else {
            response.sendStatus(400);
        }
    },

    deleteComment(request, response) {
        // Make sure ids are in range
        if(store.isValidCommentId(request.params.postId, request.params.commentId))
        {
            store.posts[request.params.postId].comments.splice(request.params.commentId, 1);
            response.sendStatus(204);
        } else {
            response.sendStatus(400);
        }
    }
};
