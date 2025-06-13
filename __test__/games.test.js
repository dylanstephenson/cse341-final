// __test__/games.test.js
const { getAll, getSingle } = require('../controllers/games');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');
const dbModule = require('../data/database');

// ✅ Move mocks to top-level so they’re accessible inside tests
const mockToArray = jest.fn();
const mockFind = jest.fn(() => ({ toArray: mockToArray }));
const mockFindOne = jest.fn();
const mockCollection = jest.fn(() => ({
  find: mockFind,
  findOne: mockFindOne
}));
const mockDb = jest.fn(() => ({ collection: mockCollection }));
const mockClient = { db: mockDb };

// ✅ Mock the database module
jest.mock('../data/database', () => ({
  getDatabase: jest.fn(() => mockClient)
}));

// ✅ Partial mock of express-validator to override only validationResult
jest.mock('express-validator', () => {
  const actual = jest.requireActual('express-validator');
  return {
    ...actual,
    validationResult: jest.fn()
  };
});

describe('gameController', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getAll', () => {
    it('should return games with status 200', async () => {
      const fakeGames = [{ title: 'Game 1' }, { title: 'Game 2' }];
      mockToArray.mockResolvedValue(fakeGames);

      await getAll(req, res);

      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeGames);
    });

    it('should return 500 on error', async () => {
      mockToArray.mockRejectedValue(new Error('DB error'));

      await getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'DB error' });
    });
  });

  describe('getSingle', () => {
    it('should return 422 if validation fails', async () => {
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: 'Invalid ID' }]
      });

      await getSingle(req, res);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({
        errors: [{ msg: 'Invalid ID' }]
      });
    });

    it('should return 404 if game not found', async () => {
      validationResult.mockReturnValue({
        isEmpty: () => true
      });
      req.params.id = '60d5ec49c8d6b94f8cd9c511';
      mockFindOne.mockResolvedValue(null);

      await getSingle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Game not found' });
    });

    it('should return game if found', async () => {
      validationResult.mockReturnValue({
        isEmpty: () => true
      });
      const fakeGame = { _id: '60d5ec49c8d6b94f8cd9c511', title: 'Halo' };
      req.params.id = '60d5ec49c8d6b94f8cd9c511';
      mockFindOne.mockResolvedValue(fakeGame);

      await getSingle(req, res);

      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeGame);
    });

    it('should return 500 on error', async () => {
        validationResult.mockReturnValue({
          isEmpty: () => true
        });
      
        req.params.id = '60d5ec49c8d6b94f8cd9c511'; // valid ObjectId
        mockFindOne.mockRejectedValue(new Error('DB exploded'));
      
        await getSingle(req, res);
      
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'DB exploded' });
      });
  });
});