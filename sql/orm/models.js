const { Database } = require('sqlite3').verbose();

// store everything in memory, meaning the database is empty on every execution.
const db = new Database(':memory:');

const createTablePeople = `
CREATE TABLE people (
  id INTEGER PRIMARY KEY ASC,
  name TEXT NOT NULL,
  eye_color TEXT NOT NULL
);`;

const createTableFriendships = `
CREATE TABLE friendships (
  id INTEGER PRIMARY KEY ASC,
  person_a INTEGER,
  person_b INTEGER,
  FOREIGN KEY(person_a, person_b) REFERENCES people(id, id),
  CHECK (person_a < person_b)
);
CREATE UNIQUE INDEX distinct_friends ON friendships (person_a, person_b);`;

// callback will receive the Person and Friendship class.
module.exports = function (callback) {

    // create the tables, and then define the models.
    db.exec(createTablePeople + createTableFriendships, defineModels);

    function defineModels(err) {

    class Person {
    }
        if (err !== null) {
            throw err;
        }

    class Friendship {
    }

    callback({ Person, Friendship });

  }

};
