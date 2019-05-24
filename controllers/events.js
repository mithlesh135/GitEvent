const actorDao = require('../Dao/actor');
const repoDao = require('../Dao/repo');
const eventDao = require('../Dao/event');

class Events {
	constructor() {}

	async addEvent(event) {
		let actor = event.actor;
		let repo = event.repo;

		await actorDao.save(actor);
		await repoDao.save(repo);
		await eventDao.save(event);

		return true;
	}

	async getAllEvents() {
		let events = await eventDao.getAll();
		return this.formatResponse(events);
	}

	eraseEvents() {
		return eventDao.deleteAll();
	}

	async getByActor(actorID) {
		let events = await eventDao.getEventsByActor(actorID);
		return this.formatResponse(events);
	}

	formatResponse(events) {
		return events.map((event) => {
			for(let key in event) {
				if(key.indexOf('.') > -1) {
					let portions = key.split('.');
					if(!event[portions[0]]) {
						event[portions[0]] = {};
					}
					event[portions[0]][portions[1]] = event[key];
					delete event[key];
				}
			}
			return event;
		});
	}
}

module.exports  = new Events()

















