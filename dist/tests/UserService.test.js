"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const axios_1 = __importDefault(require("axios"));
const UserService_1 = require("../services/UserService");
const User_1 = require("../models/User");
const uuid_1 = require("uuid");
jest.mock('bcrypt');
jest.mock('axios');
jest.mock('../models/User');
jest.mock('uuid', () => ({ v4: jest.fn() }));
jest.mock('../knex', () => ({
    __esModule: true,
    default: {
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        first: jest.fn(),
        insert: jest.fn(),
        update: jest.fn(),
    },
}));
describe('UserService', () => {
    let userService;
    let mockUserModel;
    beforeEach(() => {
        mockUserModel = new User_1.UserModel();
        userService = new UserService_1.UserService();
        userService.userModel = mockUserModel;
    });
    describe('createUser', () => {
        it('should create a new user', async () => {
            // Arrange
            const user = { email: 'test@example.com', password: 'password123', balance: 100 };
            const hashedPassword = 'hashedPassword123';
            const createdUser = Object.assign(Object.assign({}, user), { id: '123', password: hashedPassword });
            axios_1.default.get.mockResolvedValue({ data: false });
            bcrypt_1.default.hash.mockResolvedValue(hashedPassword);
            mockUserModel.create.mockResolvedValue(createdUser);
            // Act
            const result = await userService.createUser(user);
            // Assert
            expect(result).toEqual(createdUser);
        });
    });
    describe('loginUser', () => {
        it('should return a token for valid login', async () => {
            // Arrange
            const email = 'test@example.com';
            const password = 'password123';
            const hashedPassword = 'hashedPassword123';
            const user = { email, password: hashedPassword, id: '123', balance: 100 };
            const token = 'some-unique-token';
            bcrypt_1.default.compare.mockResolvedValue(true);
            mockUserModel.findByEmail.mockResolvedValue(user);
            uuid_1.v4.mockReturnValue(token);
            mockUserModel.update.mockResolvedValue();
            // Act
            const result = await userService.loginUser(email, password);
            // Assert
            expect(result).toBe(token);
            expect(mockUserModel.update).toHaveBeenCalledWith(Object.assign(Object.assign({}, user), { token }));
        });
    });
});
