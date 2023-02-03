const posts = require('./posts');


module.exports.getPosts = function(req, res) {

    posts.getPostsInfo()
    .then(data => {
        if(data.length == 0) {
            res.send({
                success: true,
                msg: "No hay publicaciones para mostrar.",
                data: null
            });
        } else {
            res.send({
                success: true,
                data: data
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.send({
            success: false,
            msg: err
        });
    });
}
