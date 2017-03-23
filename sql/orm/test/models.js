const { assert } = require('chai');

describe('orm', () => {

  let Person;
  let Friendship;

  // asynchronously require Person and Friend before running tests.
  before(done => {
    require('../models')(models => {
      Person = models.Person;
      Friendship = models.Friendship;
      done();
    });
  });


  describe('Person', () => {

    it('should exist', () => {
      assert.isFunction(Person);
    });

    it('should be able to create a person, and fetch it from the new id', done => {

        // construct a person instance and create it in the database
        const p = new Person({ name: 'Giulia', eye_color: 'blue' });
        p.create(err => {

            assert.isNull(err, 'create failed');

            // construct an instance with the same id and fetch its contents from the database
            const alsoP = new Person({ id: p.id });
            alsoP.fetch(err => {

                assert.isNull(err, 'fetch failed');

                assert.equal(p.name, alsoP.name);
                assert.equal(p.eye_color, alsoP.eye_color);

                done();
            });
        });
    });

    it('should be able to become friends with another person', done => {

        const a = new Person({ name: 'Giulia', eye_color: 'blue' });
        const b = new Person({ name: 'Allon', eye_color: 'brown' });

        a.create(err => {
            assert.isNull(err, 'create a failed');
            b.create(err => {
                assert.isNull(err, 'create b failed');

                a.becomeFriends(b, err => {

                    assert.isNull(err, 'friendship failed');

                    // make sure b is a friend of a
                    a.getFriends((err, friends) => {
                        assert.isNull(err, 'your friends could not be located');
                        assert.sameMembers(friends.map(f => f.id), [b.id]);

                        // make sure a is a friend of b
                        b.getFriends((err, friends) => {
                            assert.isNull(err, 'your friends could not be located');
                            assert.sameMembers(friends.map(f => f.id), [a.id]);
                            done();
                        });
                    });
                });
            });
        });
    });
  });

  describe('Friendship', () => {

    it('should exist', () => {
      assert.isFunction(Friendship);
    });
  });

});
