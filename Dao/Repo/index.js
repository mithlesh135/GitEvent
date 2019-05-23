const Dao = require('..');

class Repo extends Dao {
    constructor() {
        super();
    }

    createTable() {
        const command = `CREATE TABLE IF NOT EXISTS repos (
            id,
            name TEXT,
            url TEXT
        )`;

        return this.run(command);
    }

    save(repo) {
        const command = `INSERT INTO repos(
            id, name, url)
            VALUES (?,?,?)`;

        return this.run(command, [repo.id, repo.name, repo.url]);
    }
}

module.exports = new Repo();