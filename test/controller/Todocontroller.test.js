
const Service = require('../../services/todo.service');
const Controller = require('../../controllers/toDoController');
const reqBodyValidator = require('../../middlewares/todo.validator');
const HTTPError = require('../../utilities/todo.utility');
//const HTTPError = require('../../utilities/todo.utility');

describe('Task Controller', () => {
    describe('Get All Task', () => {
        it('should return an array of todos', async () => {
            const mockValue = [
                { id: 1, name: 'First mock todo', isCompleted: false },
            ];
            //stastus 200 test case with all tasks returned
            jest.spyOn(Service, 'getAll').mockReturnValue(mockValue);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            await Controller.getTasks(req, res);

            expect(res.status).toBeCalledWith(200);
            expect(res.send).toBeCalledWith(mockValue);
        });
        it('should return a json message about no tasks', async () => {
            const mockValue = {};
            jest.spyOn(Service, 'getAll').mockReturnValue(mockValue);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            try {
                await Controller.getTasks(req, res);
            } catch (err) {
                expect(res.status).toBeCalledWith(404);
                expect(res.json).toBeCalledWith({ message: 'Task not found' });

            }



        });
        it('should throw an internal server error', async () => {
            jest.spyOn(Service, 'getAll').mockReturnValue(null);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            try {
                await Controller.getTasks(req, res);


            } catch (err) {
                expect(err.message).toBe('Internal Server Error');
                expect(err.statusCode).toBe(500);
            }
        });
    });

    describe('Post a task', () => {
        it('should return a json message about an error in the datatype of \'name\' variable ', async () => {

            const req = { body: { name: 1 } };
            const next = jest.fn();
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            expect(() => reqBodyValidator(req, res, next)).toThrow(new HTTPError('name must be a string', 400));


        });
        it('should return a json message about the task being added', async () => {
            jest.spyOn(Service, 'postTask').mockReturnValue(true);

            const req = { body: { name: 'First mock todo' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await Controller.postTask(req, res);

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({ message: 'Task added successfully' });
        });
        it('should return a json message about the task not being added', async () => {
            jest.spyOn(Service, 'postTask').mockReturnValue(false);

            const req = { body: { name: 'First mock todo' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            try {
                await Controller.postTask(req, res);
            } catch (err) {
                expect(res.status).toBeCalledWith(404);
                expect(res.json).toBeCalledWith({ message: 'Task not added' });

            }



        });
    });
    describe('Delete a task', () => {
        it('should return a json message about an error in the datatype of \'id\' variable ', async () => {
            const req = { params: { id: '1' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await Controller.deleteTask(req, res);

            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({
                message: 'Task id must be an integer',
            });
        });
        it('should return a json message about the task being deleted', async () => {
            jest.spyOn(Service, 'deleteTask').mockReturnValue(true);

            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await Controller.deleteTask(req, res);

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({ message: 'Task deleted successfully' });
        });
        it('should return a json message about the task not being deleted', async () => {
            jest.spyOn(Service, 'deleteTask').mockReturnValue(false);

            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await Controller.deleteTask(req, res);

            expect(res.status).toBeCalledWith(404);
            expect(res.json).toBeCalledWith({ message: 'Task not found' });
        });
    });
});
