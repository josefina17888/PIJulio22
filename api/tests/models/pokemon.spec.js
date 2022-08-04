const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
  });
  describe('HP is a number', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('number', () => {
      it('should throw an error if healthPoints is not a number', (done) => {
        Pokemon.create({})
        .then(() => done(new Error('It requires a number')))
        .catch(() => done());
      });
      it('should work when its a valid number', () => {
        Pokemon.create({  hp: 45 });
      });
    });
  });
  describe('Attack is a number', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('number', () => {
      it('should throw an error if attack is not a number', (done) => {
        Pokemon.create({})
        .then(() => done(new Error('It requires a number')))
        .catch(() => done());
      });
      it('should work when its a valid number', () => {
        Pokemon.create({  attack: 55 });
      });
    });
  });
  describe('Types is an array', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('number', () => {
      it('should throw an error if types is not an array', (done) => {
        Pokemon.create({})
        .then(() => done(new Error('It requires an array')))
        .catch(() => done());
      });
      it('should work when its an array', () => {
        Pokemon.create({  types: ["flying", "grass"] });
      });
    });
  });
});
