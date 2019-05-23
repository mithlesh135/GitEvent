const actorDao = require('../Dao/Actor');

class Actor {
	constructor() {};

	updateActor({id, avatar_url}) {
		return actorDao.update(id, avatar_url);
	}

	getAllActors() {
		return actorDao.getActorsByEventCount();
	}
}


// var getAllActors = () => {
	
// };

// var updateActor = () => {

// };

// var getStreak = () => {

// };


module.exports = new Actor();

















