const post            = require('./post'),
      _token          = require('./../../models/token'),
      { v4: uuidv4 }  = require('uuid'),
      fs              = require('fs');

module.exports.getPost = function(req, res) {
    const id = req.params.id;
    
    post.getPostInfo(id)
    .then(data => {
        console.log(data);
        if(data.length == 0) {
            res.send({
                success: true,
                msg: "El id de publicación no existe.",
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

module.exports.validatePostData = function(req, res, next) {
    const {title, description} = req.body;

    console.log(req.body);

    if(!title) {
        return res.send({
            success: false,
            msg: "No se ha ingresado title"
        });
    }

    if(!description) {
        return res.send({
            success: false,
            msg: "No se ha ingresado description"
        });
    }

    next();
}

module.exports.createPost = async function(req, res) {
    const {title, description} = req.body;
    const token = req.headers['auth'];
    const decode = await _token.verifyToken(token);

    post.createPostInfo(decode.id, title, description)
    .then(data => {
        res.send({
            success: true,
            msg: "La publicación se ha creado satisfactoriamente"
        });
    })
    .catch(err => {
        console.log(err);
        res.send({
            success: false,
            msg: err
        });
    })
}

module.exports.editPost = async function(req, res) {
    var {title, description} = req.body;
    const token = req.headers['auth'];
    const decode = await _token.verifyToken(token);
    const IDBlog = req.params.id;

    post.editPostInfo(IDBlog, title, description, decode.id)
    .then(data => {
        res.send({
            success: true,
            msg: "La publicación se ha actualizado satisfactoriamente!"
        });
    })
    .catch(err => {
        console.log(err);
        res.send({
            success: false,
            msg: err
        });
    })
}

module.exports.deletePost = function(req, res) {
    const id = req.params.id;
    
    post.deletePostInfo(id)
    .then(data => {
        res.send({
            success: true,
            msg: data,
        });
    })
    .catch(err => {
        console.log(err);
        res.send({
            success: false,
            msg: err
        });
    });
}
