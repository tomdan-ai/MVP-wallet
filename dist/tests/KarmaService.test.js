"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const KarmaService_1 = require("../services/KarmaService");
jest.mock('axios');
describe('KarmaService', () => {
    let karmaService;
    beforeEach(() => {
        karmaService = new KarmaService_1.KarmaService();
        jest.clearAllMocks();
    });
    it('should return true for existing identity in karma list', async () => {
        const identity = '1234567890';
        const responseData = { /* Mocked response data when identity exists */};
        axios_1.default.get.mockResolvedValue({ data: responseData });
        const result = await karmaService.checkKarmaList(identity);
        expect(axios_1.default.get).toHaveBeenCalledWith(`https://adjutor.lendsqr.com/v2/verification/karma/${identity}`, expect.objectContaining({
            headers: {
                Authorization: `Bearer ${process.env.KARMA_API_TOKEN}`,
            },
        }));
        expect(result).toBe(true);
    });
    // it('should return false for non-existing identity in karma list (404 error)', async () => {
    //   const identity = '1234567890';
    //   (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue({
    //     response: { status: 404 },
    //   });
    //   const result = await karmaService.checkKarmaList(identity);
    //   expect(axios.get).toHaveBeenCalledWith(
    //     `https://adjutor.lendsqr.com/v2/verification/karma/${identity}`,
    //     expect.objectContaining({
    //       headers: {
    //         Authorization: `Bearer ${process.env.KARMA_API_TOKEN}`,
    //       },
    //     })
    //   );
    //   expect(result).toBe(false);
    // });
    it('should throw an error for other types of errors', async () => {
        const identity = '1234567890';
        const errorMessage = 'Internal server error';
        axios_1.default.get.mockRejectedValue(new Error(errorMessage));
        await expect(karmaService.checkKarmaList(identity)).rejects.toThrow('Error checking Karma List');
        expect(axios_1.default.get).toHaveBeenCalledWith(`https://adjutor.lendsqr.com/v2/verification/karma/${identity}`, expect.objectContaining({
            headers: {
                Authorization: `Bearer ${process.env.KARMA_API_TOKEN}`,
            },
        }));
    });
});
