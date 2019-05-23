const Dao = require('..');

class Repo extends Dao {
    constructor() {
        super();
    }

    createTable() {
        const command = `CREATE TABLE IF NOT EXISTS repos (
            id INT PRIMARY KEY NOT NULL,
            name TEXT,
            url TEXT
        )`;

        return this.run(command);
    }

    async save(repo) {
        const command = `INSERT INTO repos(
            id, name, url)
            VALUES (?,?,?)`;

        try {
            return await this.run(command, [repo.id, repo.name, repo.url]);
        } catch(e) {
            if(e.code === 'SQLITE_CONSTRAINT') {
                console.log(e);
            } else {
                throw e;
            }
        }    
    }
}

module.exports = new Repo();