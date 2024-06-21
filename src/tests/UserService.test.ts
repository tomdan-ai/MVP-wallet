import bcrypt from 'bcrypt';
import axios from 'axios';
import { UserService } from '../services/UserService';
import { UserModel, User } from '../models/User'; 
import { v4 as uuidv4 } from 'uuid';

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
  let userService: UserService;
  let mockUserModel: jest.Mocked<UserModel>;

  beforeEach(() => {
    mockUserModel = new UserModel() as jest.Mocked<UserModel>;
    userService = new UserService();
    (userService as any).userModel = mockUserModel;
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      // Arrange
      const user = { email: 'test@example.com', password: 'password123', balance: 100 };
      const hashedPassword = 'hashedPassword123';
      const createdUser: User = { ...user, id: '123', password: hashedPassword };

      (axios.get as jest.Mock).mockResolvedValue({ data: false });
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
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
      const user: User = { email, password: hashedPassword, id: '123', balance: 100 };
      const token = 'some-unique-token';

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockUserModel.findByEmail.mockResolvedValue(user);
      (uuidv4 as jest.Mock).mockReturnValue(token);

      mockUserModel.update.mockResolvedValue();

      // Act
      const result = await userService.loginUser(email, password);

      // Assert
      expect(result).toBe(token);
      expect(mockUserModel.update).toHaveBeenCalledWith({ ...user, token });
    });
  });
});
