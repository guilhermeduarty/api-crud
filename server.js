const express = require('express');
const clientsRoutes = require('./routes/clients.routes.js');
const sellersRoutes = require('./routes/sellers.routes.js');
const productsRoutes = require('./routes/products.routes.js');
const salesRoutes = require('./routes/sales.routes.js');

const app = express();
app.use(express.json());


app.use('/clients', clientsRoutes);
app.use('/sellers', sellersRoutes);
app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);


app.get('/', (req, res) => {
    res.json({
        message: 'API de Vendas Simples',
        endpoints: {
            clients: '/clients',
            sellers: '/sellers',
            products: '/products',
            sales: '/sales'
        }
    });
});

app.listen(3000, () => {
    console.log(' Servidor rodando em http://localhost:3000');
});