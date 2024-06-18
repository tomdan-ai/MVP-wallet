import axios from 'axios';

export class KarmaService {
  public async checkKarmaList(identity: string): Promise<boolean> {
    try {
      const response = await axios.get(`https://adjutor.lendsqr.com/v2/verification/karma/${identity}`, {
        headers: {
          Authorization: `Bearer ${process.env.KARMA_API_TOKEN}`,
        },
      });

      if (response.data) {
        return true;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          return false; 
        }
        console.error('Axios error checking Karma List:', error.message);
      } else if (error instanceof Error) {
        console.error('Error checking Karma List:', error.message);
      } else {
        console.error('Unexpected error checking Karma List:', error);
      }
      throw new Error('Error checking Karma List');
    }

    return false;
  }
}
