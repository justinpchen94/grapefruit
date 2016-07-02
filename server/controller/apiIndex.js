module.exports = {
  '/': {
    get: function(req,res) {
      console.log("Received GET at /api/");
      res.end("Received GET at /api/");
    },
    post: function(req, res) {
      console.log("Received POST at /api/");
    }
  }
};