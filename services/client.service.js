const db = require('../db.js');

class ClientService {
    create(name) {
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
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM clients WHERE id = ?", [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    update(id, name) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE clients SET name = ? WHERE id = ?';
            db.run(query, [name, id], function(err) {
                if (err) reject(err);
                else resolve({ id, name });
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM clients WHERE id = ?", [id], function(err) {
                if (err) reject(err);
                else resolve({ message: 'Cliente removido' });
            });
        });
    }
}

module.exports = new ClientService();