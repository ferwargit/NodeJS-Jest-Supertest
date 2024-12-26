import request from 'supertest';
import app from '../src/app';

describe('GET /tasks', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/tasks').send();
        // console.log(response);
        expect(response.statusCode).toBe(200);
    });
    test('should respond with an array', async () => {
        const response = await request(app).get('/tasks').send();
        // expect(response.body).toEqual(expect.arrayContaining([]));
        expect(response.body).toBeInstanceOf(Array);
    });
});