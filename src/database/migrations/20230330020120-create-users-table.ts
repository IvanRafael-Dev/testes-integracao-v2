/* eslint-disable max-lines-per-function */
import { QueryInterface, INTEGER, STRING } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: STRING,
        allowNull: false,
      },
      email: {
        type: STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('users');
  },
};
