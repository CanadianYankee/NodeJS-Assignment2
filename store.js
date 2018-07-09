// The world's dumbest database 
const postFields = ['name', 'url', 'text'];
let posts = [];

module.exports = { 
    get posts() { return posts; },
    get postFields() { return postFields; },
    isVaildPostId: function (id) {return !isNaN(Number.parseInt(id)) && posts && id >= 0 && id < posts.length; }
};
