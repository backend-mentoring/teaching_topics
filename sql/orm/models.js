const {
    Database
} = require('sqlite3').verbose();

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
module.exports = function(callback) {

    // create the tables, and then define the models.
    db.exec(createTablePeople + createTableFriendships, defineModels);

    function defineModels(err) {

        if (err !== null) {
            throw err;
        }

        class Person {

            constructor({
                id,
                name,
                eye_color
            }) {
                this.id = id;
                this.name = name;
                this.eye_color = eye_color;
            }

            create(callback) {

                var p = this

                db.run("INSERT INTO people (name, eye_color) VALUES ($name, $eye_color);", {
                    $name: this.name,
                    $eye_color: this.eye_color
                }, function(err) {
                    if (err === null) {
                        p.id = this.lastID
                    }
                    callback(err);
                })
            }

            fetch(callback) {
                db.get("SELECT name, eye_color FROM people WHERE id = $id;", {
                    $id: this.id
                }, (err, row) => {
                    if (err === null) {
                        if (row) {
                            this.name = row.name;
                            this.eye_color = row.eye_color;
                        } else {
                            err = new Error('no person found with id: ' + this.id)
                        }
                    }
                    callback(err);
                })
            }

            becomeFriends(other, callback) {
                var f = new Friendship(this, other);
                f.create(callback);
            }

            getFriends(callback) {
                Friendship.findAll(this, (err, friendships) => {

                    if (err !== null) {
                        callback(err, friendships);
                        return;
                    }

                    const ids = new Set();
                    friendships.forEach(f => {
                        ids.add(f.person_a);
                        ids.add(f.person_b);
                    });
                    // do not include the receiver
                    ids.delete(this.id);

                    const friends = Array.from(ids).map(id => new Person({ id: id }));

                    callback(err, friends);
                });
            }
        }

        class Friendship {

            static findAll(person, callback) {
                db.all("SELECT person_a, person_b FROM friendships WHERE person_a = $id OR person_b = $id", {
                    $id: person.id
                }, function (err, rows) {
                    callback(err, rows ? rows.map(r =>
                        new Friendship(
                            new Person({ id: r.person_a }),
                            new Person({ id: r.person_b }))) : []);
                });
            }

            constructor(person_a, person_b) {
                this.person_a = Math.min(person_a.id, person_b.id);
                this.person_b = Math.max(person_a.id, person_b.id);
            }

            create(callback) {

                var f = this;

                db.run("INSERT INTO friendships (person_a, person_b) VALUES ($person_a, $person_b);", {
                    $person_a: this.person_a,
                    $person_b: this.person_b
                }, function(err) {
                    if (err === null) {
                        f.id = this.lastID
                    }
                    callback(err);
                });
            }

        }

        callback({
            Person,
            Friendship
        });
    }
};
