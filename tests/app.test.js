
const request = require('supertest');
const app = require('../src/app.js');

describe('API Tests', () => {
  it('should return a 200 status code', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  it('should return a list of users', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
  });

  it('should return a single user', async () => {
    const res = await request(app).get('/tasks/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Task 1');
  });
});
