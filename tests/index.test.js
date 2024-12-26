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

describe('POST /tasks', () => {
    describe('given a title and description', () => {
       
       const newTask = {
           title: 'Test Task',
           description: 'Test Description'
       }
       
        // should respond with a 200 status code
        test('should respond with a 200 status code', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.statusCode).toBe(200);
        });

        // should respond with a content-type of application/json in header
        test('should respond with a content-type of application/json in header', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            // expect(response.headers['content-type']).toBe('application/json');
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });

        // should respond with a json object containing the new task with a unique id
        test('should respond with a json object containing the new task with a unique id', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.body.id).toBeDefined();
        });
    })

    describe('given no title or description', () => {
        test('should respond with a 400 status code', async () => {
            const fields = [
                {title: ''}, 
                {description: ''}, 
                {}
            ];
            
            for (const field of fields) {
                const response = await request(app).post('/tasks').send(field);
                expect(response.statusCode).toBe(400);
            }
        });
    });
});