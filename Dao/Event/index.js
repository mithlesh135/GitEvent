const Dao = require('..');
const TABLE_NAME = 'events';
const SELECT_QUERY = 
  `SELECT events.id, type, created_at, actors.id as 'actor.id', 
  login as 'actor.login', avatar_url as 'actor.avatar_url', 
  repos.id as 'repo.id', name as 'repo.name', url as 'repo.url' 
  FROM events 
  INNER JOIN actors ON events.fk_actorId = actors.id
  INNER JOIN repos ON events.fk_repoId = repos.id
  `;

class Event extends Dao {
    constructor() {
      super();
    }

    createTable() {
        const command = 
          `CREATE TABLE ${TABLE_NAME} ( 
            id INT PRIMARY KEY NOT NULL,
            type TEXT,
            created_at DATETIME,
            fk_actorId INT,
            fk_repoId INT,
            FOREIGN KEY (fk_actorId) REFERENCES actors(id)
            ON DELETE CASCADE ON UPDATE NO ACTION,
            FOREIGN KEY (fk_repoId) REFERENCES repos(id)
            ON DELETE CASCADE ON UPDATE NO ACTION
          )`;
        return this.run(command);
    }

    save(event) {
      const command = 
        `INSERT INTO events (
          id, type, created_at, fk_actorId, fk_repoId)
        VALUES (?,?,?,?,?)`;

      return this.run(command, [event.id, event.type, event.created_at, event.actor.id, event.repo.id]);
  }

  getAll() {
    return this.all(`${SELECT_QUERY} ORDER BY events.id ASC`);
  }

  deleteAll() {
    const command = `DELETE FROM ${TABLE_NAME}`;
    return this.run(command);
  }

  getEventsByActor(actorID) {
    const command = `${SELECT_QUERY} WHERE fk_actorId = ?`;
    return this.all(command, [actorID]);
  }
}

module.exports = new Event();