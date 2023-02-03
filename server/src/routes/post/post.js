const db = require('../../config/connection');

module.exports.getPostInfo = function(id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT blog.*, users.name FROM blog INNER JOIN users ON users.IDUsers=blog.IDUsers WHERE blog.IDBlog=?', [id], (err, results) => {
            if(err) {
                console.log(err);
                return reject('Ha ocurrido un error');
            }

            resolve(results[0]);
        });
    });
}

module.exports.createPostInfo = function(id, title, description) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO blog SET IDUsers=?, title=?, description=?', [id, title, description], (err, results) => {
            if(err) {
                console.log(err);
                return reject('Ha ocurrido un error');
            }

            resolve(results[0]);
        });
    });
}

module.exports.editPostInfo = function(IDBlog, title, description, IDUsers) {
    return new Promise((resolve, reject) => {
        db.query('SELECT IDUsers FROM blog WHERE IDBlog=?', [IDBlog], (err, results) => {
            if(err) {
                console.log(err);
                return reject('Ha ocurrido un error');
            }
            
            if(IDUsers!==results[0].IDUsers) {
                return reject('La publicación no le pertenece al usuario');
            }
            let json = {title, description};
            console.log("entre");  

            db.query('UPDATE blog SET ? WHERE IDBlog=?', [json, IDBlog], (err, results) => {
                if(err) {
                    console.log(err);
                    return reject('Ha ocurrido un error');
                }
    
                resolve(results[0]);
            });
        });
    });
}

module.exports.deletePostInfo = function(id) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM blog WHERE IDBlog=?', [id], (err, results) => {
            if(err) {
                console.log(err);
                return reject('Ha ocurrido un error');
            }

            resolve("Publicacion eliminada satisfactoriamente");
        });
    });
}
