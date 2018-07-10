const store = require('../store');

module.exports = {
    getComments(request, response) {
        // postId has been pre-validated, so we know it's okay
        // Get all comments unless a commentId was queried
        if('commentId' in request.query) {
            if(store.isValidCommentId(request.params.postId, request.query.commentId)) {
                response.status(200).send(store.posts[request.params.postId].comments[request.query.commentId]);
            } else {
                response.status(404).send({error: "Invalid postId"});
            }
        } else {
            response.status(200).send(store.posts[request.params.postId].comments);
        }
    },

    addComment(request, response) {
        // Make sure body has a "text" property
        if('text' in request.body)
        {
            let postId = request.params.postId;
            // Make sure that the comment array exists
            if(!Array.isArray(store.posts[postId].comments)) {
                store.posts[postId].comments = [];
            }
            let commentId = store.posts[postId].comments.length;
            // We only care about the "text" propery
            store.posts[postId].comments.push({text: request.body.text});
            response.status(201).send({commentId: commentId, text: request.body.text});
        } else {
            response.status(400).send({error: 'Missing text field'});
        }        
    },

    updateComment(request, response) {
        // Make body has a "text" property
        if('text' in request.body)
        {
            // We only care about the "text" propery
            store.posts[request.params.postId].comments[request.params.commentId].text = request.body.text;
            response.status(200).send({commentId: commentId, text: request.body.text});
        } else {
            response.status(400).send({error: 'Missing text field'});
        }
    },

    deleteComment(request, response) {
        // Ids have been pre-validated, so we know they are correct
        store.posts[request.params.postId].comments.splice(request.params.commentId, 1);
        response.sendStatus(204);
    }
};
