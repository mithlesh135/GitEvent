const sqlite3 = require('sqlite3');
let db;

module.exports = () => {

	if(!db) {
		db = new sqlite3.Database(':memory:');
	} 

	return db;

}
