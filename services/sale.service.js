const db = require('../db.js');

class SaleService {
    create(client_id, seller_id, product_id, quantity) {
        const date = new Date().toISOString();

        return new Promise((resolve, reject) => {
            const query = `INSERT INTO movimentacoes 
                          (client_id, seller_id, product_id, quantity, date) 
                          VALUES (?, ?, ?, ?, ?)`;

            db.run(query, [client_id, seller_id, product_id, quantity, date], function(err) {
                if (err) reject(err);
                else {

                    const selectQuery = `
                        SELECT 
                            m.*,
                            c.name as client_name,
                            s.name as seller_name,
                            p.name as product_name,
                            p.price,
                            (p.price * m.quantity) as total
                        FROM movimentacoes m
                        JOIN clients c ON m.client_id = c.id
                        JOIN sellers s ON m.seller_id = s.id
                        JOIN products p ON m.product_id = p.id
                        WHERE m.id = ?
                    `;

                    db.get(selectQuery, [this.lastID], (err, row) => {
                        if (err) reject(err);
                        else resolve(row);
                    });
                }
            });
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    m.*,
                    c.name as client_name,
                    s.name as seller_name,
                    p.name as product_name,
                    p.price,
                    (p.price * m.quantity) as total
                FROM movimentacoes m
                JOIN clients c ON m.client_id = c.id
                JOIN sellers s ON m.seller_id = s.id
                JOIN products p ON m.product_id = p.id
                ORDER BY m.date DESC
            `;

            db.all(query, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    m.*,
                    c.name as client_name,
                    s.name as seller_name,
                    p.name as product_name,
                    p.price,
                    (p.price * m.quantity) as total
                FROM movimentacoes m
                JOIN clients c ON m.client_id = c.id
                JOIN sellers s ON m.seller_id = s.id
                JOIN products p ON m.product_id = p.id
                WHERE m.id = ?
            `;

            db.get(query, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    getByClient(client_id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    m.*,
                    c.name as client_name,
                    s.name as seller_name,
                    p.name as product_name,
                    p.price,
                    (p.price * m.quantity) as total
                FROM movimentacoes m
                JOIN clients c ON m.client_id = c.id
                JOIN sellers s ON m.seller_id = s.id
                JOIN products p ON m.product_id = p.id
                WHERE m.client_id = ?
                ORDER BY m.date DESC
            `;

            db.all(query, [client_id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    getBySeller(seller_id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    m.*,
                    c.name as client_name,
                    s.name as seller_name,
                    p.name as product_name,
                    p.price,
                    (p.price * m.quantity) as total
                FROM movimentacoes m
                JOIN clients c ON m.client_id = c.id
                JOIN sellers s ON m.seller_id = s.id
                JOIN products p ON m.product_id = p.id
                WHERE m.seller_id = ?
                ORDER BY m.date DESC
            `;

            db.all(query, [seller_id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
}

module.exports = new SaleService();