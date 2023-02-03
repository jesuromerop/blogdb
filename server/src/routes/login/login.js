const db = require('../../config/connection');

module.exports.loginQuery = function(email) {
    return new Promise((resolve, reject) => {
        db.query('SELECT IDUsers, email, pass  FROM users WHERE email=?', [email], (err, results) => {
            if(err) {
                console.log('Error en el login', err.stack);
                return reject("Ha ocurrido un error");
            }

            resolve(results[0]);
        });
    });
    
}