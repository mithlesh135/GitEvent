const Dao = require('..');
const TABLE_NAME = 'actors';

class Actor extends Dao {
    constructor() {
        super();
    }

    createTable() {
        const command = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
            id INT PRIMARY KEY NOT NULL,
            login TEXT,
            avatar_url TEXT
        )`;
        return this.run(command);
    }

    async save(actor) {
        const command = `INSERT INTO actors
        (id, login, avatar_url)
        VALUES (?,?,?)`;

        try {
            return await this.run(command, [actor.id, actor.login, actor.avatar_url]);
        } catch(e) {
            if(e.code === 'SQLITE_CONSTRAINT') {
                console.log(e);
            } else {
                throw e;
            }
        }
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
            `SELECT 
            actors.id as 'id', login, avatar_url
            FROM events INNER JOIN actors 
            ON events.fk_actorId = actors.id
            GROUP BY fk_actorId
            ORDER BY COUNT(fk_actorId) DESC,
            created_at DESC`;

        return this.all(command);
    }

    getActorsOrderedByDateAndName() {
        const command = `
            SELECT 
            fk_actorId as 'id', login, avatar_url,
            created_at
            FROM events INNER JOIN actors 
            ON actors.id=events.fk_actorId 
            ORDER BY DATE(created_at) DESC, login ASC`;

        return this.all(command);
    }
}

module.exports = new Actor();