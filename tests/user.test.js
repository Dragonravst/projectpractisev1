const request = require('supertest');
const app = require('../server');// Your Express app
const { sequelize } = require('../models');  // For DB setup

beforeAll(async () => {
  // Sync DB for tests (use a test DB)
  await sequelize.sync({ force: true });  // Reset DB before tests
});

afterAll(async () => {
  await sequelize.close();  // Clean up
});

describe('User API', () => {
  it('should create a user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});