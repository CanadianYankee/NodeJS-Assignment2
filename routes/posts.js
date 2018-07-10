const store = require('../store');

module.exports = {
    getPosts(request, response) {
        // Return selected blog post, or all of them if no id was supplied
        if('postId' in request.query) {
            if(store.isValidPostId(request.query.postId))
            {
                response.status(200).send(store.posts[request.query.postId]);
            } else {
                response.sendStatus(400);
            }
        } else {
            response.status(200).send(store.posts);
        }
    },

    addPost(request, response) {
        // Only get blog post fields that we care about
        let newPost = {};
        store.postFields.forEach((f) => { newPost[f] = request.body[f]; });
        // New posts have no comments yet
        newPost.comments = [];
        let postId = store.posts.length;
        store.posts.push(newPost);
        response.status(201).send({postId: postId});
    },

    updatePost(request, response) {
        // Make sure id is in range
        if(store.isValidPostId(request.params.postId))
        {
            let id = request.params.postId;
            // Allow partial updates by only udating fields that are in the request
            store.postFields.forEach((f) => {
                if(f in request.body) {
                    store.posts[id][f] = request.body[f];
                }
            });
            response.sendStatus(204);
        } else {
            response.sendStatus(400);
        }
    },

    deletePost(request, response) {
        // Make sure id is in range
        if(store.isValidPostId(request.params.postId))
        {
            let id = request.params.postId;
            store.posts.splice(id, 1);
            response.sendStatus(204);
        } else {
            response.sendStatus(400);
        }
    }
};
