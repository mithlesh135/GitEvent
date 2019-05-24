const actorDao = require('../Dao/actor');
const moment = require('moment');

class Actor {
	constructor() {};

	updateActor({id, avatar_url}) {
		return actorDao.update(id, avatar_url);
	}

	getAllActors() {
		return actorDao.getActorsByEventCount();
	}

	async getStreak() {
		let result = this.processActors(await actorDao.getActorsOrderedByDateAndName());

		result = Array.from(new Set(result.map(item => item.id))).map(id => {
			return result.find(res => res.id === id);
		});

		result = result.sort((current, next) => {
			if(current, next) {
				let currentDate = moment(current.created_at, 'YYYY-MM-DD HH:mm:ss');
				let nextDate = moment(next.created_at, 'YYYY-MM-DD HH:mm:ss');

				if(current.streak > next.streak) {
					return -1;
				} else if(current.streak < next.streak) {
					return 1;
				} else if(currentDate.isAfter(nextDate)) {
					return -1;
				} else if(currentDate.isBefore(nextDate)) {
					return 1;
				} else if(current.login.toUpperCase() < next.login.toUpperCase()) {
					return -1;
				} else if(current.login.toUpperCase() > next.login.toUpperCase()) {
					return 1;
				}

			}
		});


		result = result.map(item => {
			delete item.streak;
			delete item.created_at;
			return item;
		});

		return result;
	}

	processActors(actors) {
		let result = [];

		actors.forEach((item, index) => {
			result.push({
				id: item.id,
				avatar_url: item.avatar_url,
				login: item.login,
				streak: this.getProcessedStreak(actors, index),
            	created_at: item.created_at
			});
		});
		
		return result;
	}

	getProcessedStreak(actors, index) {
		let streak = 1;
		while(true) {
			if(actors[index + 1]) {
				let currentDate = moment(actors[index].created_at, 'YYYY-MM-DD');
				let nextDate = moment(actors[index + 1].created_at, 'YYYY-MM-DD');

				if(currentDate.subtract(1, 'd').isSame(nextDate) && actors[index].id === actors[index+1].id) {
					streak++;
					actors.splice(index, 1);
				}
				break;
			}
			break;
		}
		return streak;
	}
}


module.exports = new Actor();

















