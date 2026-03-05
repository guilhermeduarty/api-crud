const express = require('express');
const router = express.Router();
const userService = require('../services/user.services.js');


router.get('/', async(req, res) => {
    try {
        const users = await userService.list();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', async(req, res) => {
    try {
        const { name } = req.body;
        const user = await userService.create(name);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;