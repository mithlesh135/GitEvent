const Dao = require('..');
const TABLE_NAME = 'actors';

class Actor extends Dao {
    constructor() {
        super();
    }

    createTable() {
        const command = `CREATE TABLE IF NOT EXISTS actors (
            id INT NOT NULL,
            login TEXT,
            avatar_url TEXT
        )`;
        return this.run(command);
    }

    save(actor) {
        const command = `INSERT INTO actors
        (id, login, avatar_url)
        VALUES (?,?,?)`;

        return this.run(command, [actor.id, actor.login, actor.avatar_url]);
    }

    update(id, avatar_url) {
        const command = `
            UPDATE ${TABLE_NAME} SET
            avatar_url = ?
            WHERE id = ?
        `;

        return this.run(command, [avatar_url, id]);
    }

    getActorsByEventCount() {
        const command =  
        `SELECT DISTINCT 
        actors.id as 'id', 
        login, avatar_url
        FROM events 
        INNER JOIN actors ON events.fk_actorId = actors.id
        WHERE actors.id IN (
            SELECT fk_actorId from events
            GROUP BY fk_actorId HAVING COUNT(*) > 0
            ORDER BY fk_actorId DESC
        ) ORDER BY created_at DESC`;
        return this.all(command);
    }
}

module.exports = new Actor();