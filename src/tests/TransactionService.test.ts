import { TransactionService } from '../services/TransactionService';
import { UserModel, User } from '../models/User';

jest.mock('../models/User');

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
  

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let mockUserModel: jest.Mocked<UserModel>;

  beforeEach(() => {
    mockUserModel = new UserModel() as jest.Mocked<UserModel>;
    transactionService = new TransactionService();
    (transactionService as any).userModel = mockUserModel;
  });

  describe('fundAccount', () => {
    it('should increase user balance', async () => {
      const user: User = { id: '1', email: 'test@example.com', password: 'password', balance: 100 };
      mockUserModel.findById.mockResolvedValue(user);
      mockUserModel.update.mockResolvedValue();

      await transactionService.fundAccount('1', 50);

      expect(user.balance).toBe(150);
      expect(mockUserModel.update).toHaveBeenCalledWith(user);
    });
  });

  describe('withdrawFunds', () => {
    it('should decrease user balance', async () => {
      const user: User = { id: '1', email: 'test@example.com', password: 'password', balance: 100 };
      mockUserModel.findById.mockResolvedValue(user);
      mockUserModel.update.mockResolvedValue();

      await transactionService.withdrawFunds('1', 30);

      expect(user.balance).toBe(70);
      expect(mockUserModel.update).toHaveBeenCalledWith(user);
    });

    it('should throw error if insufficient funds', async () => {
      const user: User = { id: '1', email: 'test@example.com', password: 'password', balance: 20 };
      mockUserModel.findById.mockResolvedValue(user);

      await expect(transactionService.withdrawFunds('1', 30)).rejects.toThrow('Insufficient funds');
    });
  });
});