import axios from 'axios';
import { KarmaService } from '../services/KarmaService';

jest.mock('axios');

describe('KarmaService', () => {
  let karmaService: KarmaService;

  beforeEach(() => {
    karmaService = new KarmaService();
    jest.clearAllMocks();
  });

  it('should return true for existing identity in karma list', async () => {
    const identity = '1234567890';
    const responseData = { /* Mocked response data when identity exists */ };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: responseData });

    const result = await karmaService.checkKarmaList(identity);

    expect(axios.get).toHaveBeenCalledWith(
      `https://adjutor.lendsqr.com/v2/verification/karma/${identity}`,
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${process.env.KARMA_API_TOKEN}`,
        },
      })
    );
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
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error(errorMessage));

    await expect(karmaService.checkKarmaList(identity)).rejects.toThrow('Error checking Karma List');

    expect(axios.get).toHaveBeenCalledWith(
      `https://adjutor.lendsqr.com/v2/verification/karma/${identity}`,
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${process.env.KARMA_API_TOKEN}`,
        },
      })
    );
  });
});
