// DESCRIBE -> bloco de testes - tests suites
// IT or TEST -> declara um único teste unitario - tests cases
// EXPECT -> resultado do teste - validação
const request = require('supertest');
const app = require('../../app');

jest.mock('../../middleware/requireAuthentication', () => (req, res, next) => next());

describe('User Controllers', () => {
  
  describe('GET /allUsersList', () => {
    test('Return all users in case of success', async () => {
      const res = await request(app).get('/user');
        expect(res.statusCode).toBe(200);
    });
  });
});