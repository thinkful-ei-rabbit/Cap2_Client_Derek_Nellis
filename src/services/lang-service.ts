import config from 'src/config';

import TokenService from './token-service';

const { API_ENDPOINT } = config;

const LangService = {
  getHeaders(): {
    'content-type': string;
    authorization: string;
  } {
    return {
      'content-type': 'application/json',
      authorization: `Bearer ${TokenService.getAuthToken()}`,
    };
  },

  async getLanguage(): Promise<LC.Res> {
    const res = await fetch(`${API_ENDPOINT}/language`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return await res.json();
  },

  async getHead(): Promise<LC.Head> {
    const res = await fetch(`${API_ENDPOINT}/language/head`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return await res.json();
  },

  async submitGuess(guess: string): Promise<LC.Guess> {
    const res = await fetch(`${API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ guess }),
    });

    return await res.json();
  },
};

export default LangService;
