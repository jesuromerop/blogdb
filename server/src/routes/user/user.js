const db = require('../../config/connection');

module.exports.changeEmailData = function(IDUsers, email) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email=? AND NOT IDUsers=?', [email, IDUsers], (err, results) => {
            if(err) {
                console.log(err);
                return reject('Ha ocurrido un error');
            }
            if(results.length > 0) {
                return reject('Ya hay un usuario registrado con ese correo');
            } else {
                db.query('UPDATE users SET email=? WHERE IDUsers=?', [email, IDUsers], (err, results) => {
                    if(err) {
                        console.log(err);
                        return reject('Ha ocurrido un error');
                    }
                    resolve(results[0]);
                });
            }
        });
    });
}

module.exports.changeNameData = function(IDUsers, name) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET name=? WHERE IDUsers=?', [name, IDUsers], (err, results) => {
            if(err) {
                console.log(err);
                return reject('Ha ocurrido un error');
            }
            resolve(results[0]);
        });
    });
}

module.exports.changePassData = function(IDUsers, hash) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET pass=? WHERE IDUsers=?', [hash, IDUsers], (err, results) => {
            if(err) {
                console.log(err);
                return reject('Ha ocurrido un error');
            }
            resolve(results[0]);
        });
    });
}

exports.getData = function (id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT name, email, regDate FROM users WHERE IDUsers = ?', [id], (error, results) => {

            if (error) {
                console.log('error en obtener data', error.stack);
                return reject('Error')
            }
            let userinfo = results[0];
            db.query('SELECT * FROM blog WHERE IDUsers = ?', [id], (error, results) => {

                if (error) {
                    console.log('error en obtener data', error.stack);
                    return reject('Error')
                }

                if(results.length>0) {
                    resolve([{userInfo: userinfo, userPosts: results}]);
                } else {
                    resolve([{userInfo: userinfo, userPosts: "No hay publicaciones para mostrar."}]);
                }
            });
        });
    });
}