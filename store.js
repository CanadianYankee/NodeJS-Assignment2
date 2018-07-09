// The world's dumbest database 
module.exports = { 
    posts: [], 
    postFields: ['name', 'url', 'text'],
    isValidPostId(id) { return !isNaN(Number.parseInt(id)) && id >= 0 && id < this.posts.length; }
};
