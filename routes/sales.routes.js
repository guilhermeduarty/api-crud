const express = require('express');
const router = express.Router();
const saleService = require('../services/sale.service.js');


router.get('/', async(req, res) => {
    try {
        const sales = await saleService.list();
        res.json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/:id', async(req, res) => {
    try {
        const sale = await saleService.getById(req.params.id);
        if (!sale) {
            return res.status(404).json({ error: 'Venda não encontrada' });
        }
        res.json(sale);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/client/:clientId', async(req, res) => {
    try {
        const sales = await saleService.getByClient(req.params.clientId);
        res.json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/seller/:sellerId', async(req, res) => {
    try {
        const sales = await saleService.getBySeller(req.params.sellerId);
        res.json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', async(req, res) => {
    try {
        const { client_id, seller_id, product_id, quantity } = req.body;


        if (!client_id || !seller_id || !product_id || !quantity) {
            return res.status(400).json({
                error: 'Cliente, vendedor, produto e quantidade são obrigatórios'
            });
        }

        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ error: 'Quantidade deve ser um número positivo' });
        }

        const sale = await saleService.create(
            parseInt(client_id),
            parseInt(seller_id),
            parseInt(product_id),
            parseInt(quantity)
        );

        res.status(201).json(sale);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;