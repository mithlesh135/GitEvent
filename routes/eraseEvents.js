var express = require('express');
var router = express.Router();
var eventCtrl = require('../controllers/events');

router.delete('/', async (req, res) => {
    try {
        await eventCtrl.eraseEvents();
        res.send(200, {
            success: true
        });
    } catch(e) {
        console.log(e);
        res.send(500);
    }
});

module.exports = router;