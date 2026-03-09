const express = require('express');
const router = express.Router();
const productService = require('../services/product.service.js');


router.get('/', async(req, res) => {
    try {
        const products = await productService.list();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async(req, res) => {
    try {
        const product = await productService.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', async(req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
        }
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ error: 'Preço deve ser um número positivo' });
        }
        const product = await productService.create(name, parseFloat(price));
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/:id', async(req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
        }
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ error: 'Preço deve ser um número positivo' });
        }
        const product = await productService.update(req.params.id, name, parseFloat(price));
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:id', async(req, res) => {
    try {
        await productService.delete(req.params.id);
        res.json({ message: 'Produto removido com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;