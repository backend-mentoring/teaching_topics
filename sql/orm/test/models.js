const { assert } = require('chai');

describe('orm', () => {

  let Person;
  let Friend;

  // asynchronously require Person and Friend before running tests.
  before(done => {
    require('../models')(models => {
      Person = models.Person;
      Friend = models.Friend;
      done();
    });
  });


  describe('Person', () => {

    it('should exist', () => {
      assert.isFunction(Person);
    });

  });

  describe('Friend', () => {

    it('should exist', () => {
      assert.isFunction(Friend);
    });

  });

});
