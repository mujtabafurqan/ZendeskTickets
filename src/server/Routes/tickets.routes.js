const express = require('express');
const ticketControllers = require('../Controllers/tickets.controllers');
const router = express.Router();

// To create multiple tickets in one request
router.post('/createMany', ticketControllers.createMany);

// To get a list of all tickets linked to a account
router.get('/list', ticketControllers.list);

module.exports = router;