const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actors');

function validate(payload) {
    const allowed = ['id', 'login', 'avatar_url'];

    for(let prop in payload) {
        if(allowed.indexOf(prop) === -1) {
            return false;
        }
    }

    return true;
}

router.put('/', async (req, res) => {

    if(!validate(req.body)) {
        res.send(400);
    } else {
        try {
            let result = await actorController.updateActor(req.body) || [];
            if(result && result.changes) {
                res.send(200);
            } else {
                res.send(404);
            }
        } catch(e) {
            console.log(e);
            res.send(500);
        }
    }
});

router.get('/', async (req, res) => {

    try {
        let result = await actorController.getAllActors();
        res.send(200, result);
    } catch(e) {
        console.log(e);
        res.send(500);
    }

});

module.exports = router;