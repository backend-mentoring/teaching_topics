const { Database } = require('sqlite3').verbose();

// store everything in memory, meaning the database is empty on every execution.
const db = new Database(':memory:');

const createTablePeople = `
CREATE TABLE people (
  id INTEGER PRIMARY KEY ASC,
  name TEXT NOT NULL,
  eye_color TEXT NOT NULL
);`;

const createTableFriends = `
CREATE TABLE friends (
  id INTEGER PRIMARY KEY ASC,
  a INTEGER,
  b INTEGER,
  FOREIGN KEY(a, b) REFERENCES people(id),
  CHECK (a < b)
);`;

// callback will receive the Person and Friend class.
module.exports = function (callback) {

  // create the tables, and then define the models.
  db.run(createTablePeople + createTableFriends, defineModels);

  function defineModels() {

    class Person {
    }

    class Friend {
    }

    callback({ Person, Friend });

  }

};

