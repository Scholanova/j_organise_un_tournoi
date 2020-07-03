'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Competitions',[{
      id:42000,
      name:'tounoi smash bros ultimate',
      nb_participant:16,
      createdAt: new Date('2020-06-28T15:24:00'),
      updatedAt: new Date('2020-07-02T03:56:00'),
      status:true
    },
    {
      id:42001,
      name:'coupe du monde 2022',
      nb_participant:8,
      createdAt: new Date('1995-06-28T15:24:00'),
      updatedAt: new Date('1995-07-02T03:56:00'),
      status:false
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Competitions', null, {});
  }
};
