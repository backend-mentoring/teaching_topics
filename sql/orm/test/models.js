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

  });

  describe('Friendship', () => {

    it('should exist', () => {
      assert.isFunction(Friendship);
    });

  });

});
