/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Tasks", [
      {
        name: "Task 1",
        isComplete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Task 2",
        isComplete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tasks", null, {});
  },
};
