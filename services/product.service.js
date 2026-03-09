const db = require('../db.js');

class ProductService {
    create(name, price) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
            db.run(query, [name, price], function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, name, price });
            });
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM products", [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    update(id, name, price) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
            db.run(query, [name, price, id], function(err) {
                if (err) reject(err);
                else resolve({ id, name, price });
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM products WHERE id = ?", [id], function(err) {
                if (err) reject(err);
                else resolve({ message: 'Produto removido' });
            });
        });
    }
}

module.exports = new ProductService();