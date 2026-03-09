const express = require('express');
const router = express.Router();
const clientService = require('../services/client.service.js');


router.get('/', async(req, res) => {
    try {
        const clients = await clientService.list();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/:id', async(req, res) => {
    try {
        const client = await clientService.getById(req.params.id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(client);
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
        const client = await clientService.create(name);
        res.status(201).json(client);
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
        const client = await clientService.update(req.params.id, name);
        res.json(client);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:id', async(req, res) => {
    try {
        await clientService.delete(req.params.id);
        res.json({ message: 'Cliente removido com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;