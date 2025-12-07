const request = require('supertest');
const app = require('../server');  // Your Express app
const { sequelize } = require('../models');  // For DB setup

let token;  // Store JWT token for auth

beforeAll(async () => {
  // Sync DB for tests (use a test DB)
  await sequelize.sync({ force: true });  // Reset DB before tests

  // Create a test user and get token (for auth)
  await request(app)
    .post('/api/users')
    .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });

  const loginRes = await request(app)
    .post('/api/users/login')
    .send({ email: 'test@example.com', password: 'password123' });
  token = loginRes.body.token;
});

afterAll(async () => {
  await sequelize.close();  // Clean up
});

describe('Tag API', () => {
  let tagId;  // Store created tag ID for updates/deletes

  it('should create a tag', async () => {
    const response = await request(app)
      .post('/api/tags')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Tag' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    tagId = response.body.id;  // Save for later tests
  });

  it('should get all tags', async () => {
    const response = await request(app)
      .get('/api/tags')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a single tag by ID', async () => {
    const response = await request(app)
      .get(`/api/tags/${tagId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Test Tag');
  });

  it('should update a tag', async () => {
    const response = await request(app)
      .put(`/api/tags/${tagId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Tag' });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Tag updated');
  });

  it('should delete a tag', async () => {
    const response = await request(app)
      .delete(`/api/tags/${tagId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Tag deleted');
  });
});