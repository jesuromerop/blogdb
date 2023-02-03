const user   = require('./user'),
      _token = require('../../models/token'),
      bcrypt = require('bcrypt');

module.exports.validateEmailData = function(req, res, next) {
    const email = req.body.email;

    if(!email) {
        return res.send({
            success: false,
            msg: "No se ha ingresado email"
        });
    }

    next();
}

module.exports.changeEmail = async function(req, res) {
    const email  = req.body.email,
          token  = req.headers['auth'],
          decode = await _token.verifyToken(token); 

    user.changeEmailData(decode.id, email)
    .then(data => {
        const payload = {
            'id': decode.id,
            'email': email
        }

        _token.signToken(payload)
        .then(token => {
            console.log(token)
    
            res.send({
            success: true,
            msg: "El email se ha cambiado satisfactoriamente",
            token: token
            });
        })
        .catch(err => {
            res.send({
            success: false,
            msg: 'Ha ocurrido un error'
            })
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

module.exports.validateNameData = function(req, res, next) {
    const name = req.body.name;

    if(!name) {
        return res.send({
            success: false,
            msg: "No se ha ingresado nombre"
        });
    }

    next();
}

module.exports.changeName = async function(req, res) {
    const name  = req.body.name,
          token  = req.headers['auth'],
          decode = await _token.verifyToken(token); 

    user.changeNameData(decode.id, name)
    .then(data => {
        const payload = {
            'id': decode.id,
            'name': name
        }

        _token.signToken(payload)
        .then(token => {
            console.log(token)
    
            res.send({
            success: true,
            msg: "El nombre se ha cambiado satisfactoriamente",
            token: token
            });
        })
        .catch(err => {
            res.send({
            success: false,
            msg: 'Ha ocurrido un error'
            })
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

module.exports.validatePassData = function(req, res, next) {
    const pass = req.body.pass;

    if(!pass) {
        return res.send({
            success: false,
            msg: "No se ha ingresado pass"
        });
    }

    next();
}

module.exports.changePass = async function(req, res) {
    const pass  = req.body.pass,
          token  = req.headers['auth'],
          decode = await _token.verifyToken(token); 

    bcrypt.hash(pass, 10, function(err, hash) {
        if(err) {
            return res.send({
                success: false,
                msg: "Ha ocurrido un error"
            })
        }
        user.changePassData(decode.id, hash)
        .then(data => {
            console.log(data);

            res.send({
                success: true,
                msg: "El pass se ha cambiado satisfactoriamente"
            });
        })
        .catch(err => {
            res.send({
            success: false,
            msg: 'Ha ocurrido un error'
            })
        });
    })
}

module.exports.getDataUser = async function (req, res) {
    const token = req.headers['auth'];
    const decode = await _token.verifyToken(token);

    user.getData(decode.id)
    .then(data => {
        console.log(data);
        res.send({
            success: true,
            data: data
        });
    })
    .catch(err => {
        console.log(err)
    });

}