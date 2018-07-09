const store = require('../store');

module.exports = {
    getPosts(request, response) {
        // Return selected blog post, or all of them if no id was supplied
        if('postId' in request.query) {
            if(store.isVaildPostId(request.query.postId))
            {
                response.status(200).send(store.posts[request.query.postId]);
            } else {
                response.sendStatus(400);
            }
        } else {
            response.status(200).send(store.posts);
        }
    },

    postPosts(request, response) {
        // Only get blog post fields that we care about
        let newPost = {};
        console.log(store.fields);
        store.fields.foreach((f) => { newPost[f] = request.body[f]; });
        let postId = store.posts.length;
        store.posts.push(newPost);
        response.status(201).send({postId: postId});
    },

    putPosts(request, response) {
        // Make sure id is in range
        if(store.isVaildPostId(request.params.postId))
        {
            let id = request.params.postId;
            // Allow partial updates by only udating fields that are in the request
            store.fields.foreach((f) => {
                if(f in request.body) {
                    store.posts[id][f] = request.body[f];
                }
            });
            response.sendStatus(204);
        } else {
            response.sendStatus(400);
        }
    },

    deletePosts(request, response) {
        // Make sure id is in range
        if(store.isVaildPostId(request.params.postId))
        {
            let id = request.params.postId;
            store.posts.splice(id, 1);
            response.sendStatus(204);
        } else {
            response.sendStatus(400);
        }
    }
};
