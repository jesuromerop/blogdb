const db = require('../../config/connection');

module.exports.getPostsInfo = function() {
    return new Promise((resolve, reject) => {
        db.query('SELECT blog.*, users.name FROM blog INNER JOIN users ON users.IDUsers=blog.IDUsers GROUP BY blog.IDBlog', (err, results) => {
            if(err) {
                console.log(err);
                return reject('Ha ocurrido un error');
            }
            console.log(results)
            resolve(results);
        });
    });
}