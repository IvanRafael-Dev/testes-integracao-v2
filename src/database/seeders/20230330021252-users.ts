import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'user-01',
        email: 'user-01@mail.com',
        password: 'user-01-password',
      },
      {
        username: 'user-02',
        email: 'user-02@mail.com',
        password: 'user-02-password',
      },
    ], {});
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('users', {}, {});
  },
};
