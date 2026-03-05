const db = require('../db.js');

class UserService {

    create(name) {
        if (!name) throw new Error('Name is required');

        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO clients (name) VALUES (?)';
            db.run(query, [name], function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, name });
            });
        });
    }


    list() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM clients", [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = new UserService();