const db = require('../../config/connection');

module.exports.registerQuery = function(name, email, pass) {
    return new Promise((resolve, reject) => {
        db.query('SELECT email FROM users WHERE email=?', [email], (err, results) => {
            if(err) {
                console.log('Error en el registro', err.stack);
                return reject("Ha ocurrido un error");
            }

            if(results.length > 0) {
                return reject("Ya existe un usuario con el email ingresado");
            } else {
                db.query(`INSERT INTO users SET name=?, email=?, pass=?`, [name, email, pass], (err, results) => {
                    if(err) {
                        console.log('Error en el registro', err.stack);
                        return reject("Ha ocurrido un error");
                    }
        
                    if(results.length > 0) {
                        return reject("Ya existe un usuario con el email ingresado");
                    } else {
                        return resolve("El usuario ha sido registrado satisfactoriamente");
                    }
                });
            }
        });
    });
}