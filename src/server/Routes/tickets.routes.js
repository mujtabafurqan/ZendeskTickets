const express = require('express');
const ticketControllers = require('../Controllers/tickets.controllers');
const router = express.Router();

// To create multiple tickets in one request
router.post('/createMany', ticketControllers.createMany);

// To get a list first 25 tickets linked to a account
router.get('/list', ticketControllers.list);

//To get a count of all tickets linked to a account
router.get('/count', ticketControllers.count);

//To get the next 25 tickets linked to a account
router.get('/getNext', ticketControllers.getNext);

router.get('/getPrevious', ticketControllers.getPrevious);

module.exports = router;