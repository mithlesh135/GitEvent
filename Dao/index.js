const sqlite3 = require('sqlite3');
const dbFactory = require('../Factory/dbFactory');

class Dao {
    constructor() {
      this.db = dbFactory();
    }
  
    run(sql, params) {
      return new Promise((resolve, reject) => {
        {
          this.db.run(sql, params, function(err) {
            if(err) {
              reject(err);
            } else {
              resolve({ id: this.lastID, changes: this.changes });
            }
          });
        }
      }) 
    }

    all(sql, params = []) {
      return new Promise((resolve, reject) => {
        this.db.all(sql, params, (err, rows) => {
          if (err) {
            console.log('Error running sql: ' + sql)
            console.log(err)
            reject(err)
          } else {
            resolve(rows)
          }
        })
      });
    }
  }

  module.exports = Dao;