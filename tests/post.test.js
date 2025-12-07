const request = require('supertest');
const app = require('../server');  // Your Express app
const { sequelize } = require('../models');  // For DB setup

let token;  // Store JWT token for auth

beforeAll(async () => {
  // Sync DB for tests (use a test DB to avoid affecting real data)
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

describe('Post API', () => {
  let postId;  // Store created post ID for updates/deletes

  it('should create a post', async () => {
    const response = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Post', content: 'This is a test post.', userId: 1 });  // Assuming userId 1 from test user
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    postId = response.body.id;  // Save for later tests
  });

  it('should get all posts', async () => {
    const response = await request(app)
      .get('/api/posts')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a single post by ID', async () => {
    const response = await request(app)
      .get(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Test Post');
  });

  it('should update a post', async () => {
    const response = await request(app)
      .put(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Post', content: 'Updated content.', userId: 1 });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post updated');
  });

  it('should add tags to a post', async () => {
    // First, create a tag
    const tagRes = await request(app)
      .post('/api/tags')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Tag' });
    const tagId = tagRes.body.id;

    const response = await request(app)
      .post(`/api/posts/${postId}/tags`)
      .set('Authorization', `Bearer ${token}`)
      .send({ tagIds: [tagId] });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Tags added to post');
  });

  it('should delete a post', async () => {
    const response = await request(app)
      .delete(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post deleted');
  });
});