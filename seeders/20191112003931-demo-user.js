'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('users', [{
      fullName: "Aisha Laghmani",
      appName: "Prayer Times",
      deployUrl: "https://pages.git.generalassemb.ly/alaghmani123/Project-2-prayer-times/",
      gitHubRepo: "https://git.generalassemb.ly/alaghmani123/Project-2-prayer-times",
      imageUrl: "https://interapt-cade.s3.amazonaws.com/Image+from+iOS.jpg",
      project: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      fullName: "Schmitty McGoo",
      appName: "Whatevs",
      deployUrl: "https://pages.git.generalassemb.ly/alaghmani123/Project-2-prayer-times/",
      gitHubRepo: "https://git.generalassemb.ly/alaghmani123/Project-2-prayer-times",
      imageUrl: "https://interapt-cade.s3.amazonaws.com/Image+from+iOS.jpg",
      project: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
  
      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
