const bcrypt = require('bcrypt'),
      token  = require('../../models/token'),
      login  = require('./login');

module.exports.validateDataLogin = function(req, res, next) {
    const {email, pass} = req.body;

    if(!email) {
        return res.send({
            success: false,
            msg: "No se ha ingresado email"
        });
    }

    if(!pass) {
        return res.send({
            success: false,
            msg: "No se ha ingresado pass"
        });
    }

    next();
}

module.exports.loginUser = function(req, res) {
    const {email, pass} = req.body;

    login.loginQuery(email)
    .then(data => {
        console.log(data);

        if(data==undefined) {
            res.send({
                success: false,
                msg: "El usuario no existe"
            });
        } else {
            const hash = data.pass;

            bcrypt.compare(pass, hash)
            .then(function(result) {
                console.log(result);
                if(result) {
                    
                    const payload = {
                        'id': data.IDUsers,
                        'email': data.email
                    }

                    token.signToken(payload)
                    .then(token => {
                        console.log(token)
                
                        res.send({
                        success: true,
                        token: token
                        })
                    })
                    .catch(err => {
                        res.send({
                        success: false,
                        msg: 'Ha ocurrido un error'
                        })
                    })
                } else {
                    res.send({
                        success: false,
                        msg: 'Contraseña inválida'
                    });
                }
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.send({
            success: false,
            msg: 'Ha ocurrido un error'
        });
    });
}