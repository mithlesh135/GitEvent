var express = require('express');
var router = express.Router();
var eventCtrl = require('../controllers/events');

// Routes related to event

router.post('/', async (req, res) => {
    try {
        await eventCtrl.addEvent(req.body);
        res.send(201, {
            success: true
        });
    } catch(e) {
        console.log(e);
        res.send(500);
    }

    
});

router.get('/', async(req, res) => {
    try {
        let events = await eventCtrl.getAllEvents();
        res.send(200, events);
    } catch(e) {
        console.log(e);
        res.send(500);
    }

});

router.get('/actors/:actorID', async (req, res) => {
    try {
        let events = await eventCtrl.getByActor(req.params.actorID)
        res.send(200, events);
    } catch(e) {
        console.log(e);
        res.send(500);
    }
});

module.exports = router;