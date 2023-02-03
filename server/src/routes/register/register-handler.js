const bcrypt = require('bcrypt');
const register = require('./register');


module.exports.validateDataReg = function(req, res, next) {
    const {name, email, pass} = req.body;

    if(!name) {
        return res.send({
            success: false,
            msg: "El nombre está vacío"
        });
    }

    if(!email) {
        return res.send({
            success: false,
            msg: "El email está vacío"
        });
    }

    if(!pass) {
        return res.send({
            success: false,
            msg: "El pass está vacío"
        });
    }

    next();
}

module.exports.registerUser = function(req, res) {
    const {name, email, pass} = req.body;

    bcrypt.hash(pass, 10, function(err, hash) {
        if(err) {
            return res.send({
                success: false,
                msg: "Ha ocurrido un error"
            })
        }
        register.registerQuery(name, email, hash)
        .then(data => {
            console.log(data);

            res.send({
                success: true,
                msg: data
            })
        })
        .catch(err => {
            console.log(err);
            res.send({
                success: false,
                msg: err
            });
        });
    })
}