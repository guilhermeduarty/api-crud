const express = require('express');
const router = express.Router();
const sellerService = require('../services/seller.service.js');


router.get('/', async(req, res) => {
    try {
        const sellers = await sellerService.list();
        res.json(sellers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/:id', async(req, res) => {
    try {
        const seller = await sellerService.getById(req.params.id);
        if (!seller) {
            return res.status(404).json({ error: 'Vendedor não encontrado' });
        }
        res.json(seller);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', async(req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Nome é obrigatório' });
        }
        const seller = await sellerService.create(name);
        res.status(201).json(seller);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/:id', async(req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Nome é obrigatório' });
        }
        const seller = await sellerService.update(req.params.id, name);
        res.json(seller);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /sellers/:id - Remover vendedor
router.delete('/:id', async(req, res) => {
    try {
        await sellerService.delete(req.params.id);
        res.json({ message: 'Vendedor removido com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;