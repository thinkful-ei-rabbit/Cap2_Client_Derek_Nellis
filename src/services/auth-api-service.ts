import config from 'src/config';
import TokenService from './token-service';

type PostUser = {
  name?: string;
  username: string;
  password: string;
};

type Res = { error: string } | { authToken: string };

const AuthApiService = {
  async postUser(user: PostUser): Promise<Res> {
    const res = await fetch(`${config.API_ENDPOINT}/user`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return await res.json();
  },

  async postLogin(user: PostUser): Promise<Res> {
    const { username, password } = user;

    const res = await fetch(`${config.API_ENDPOINT}/auth/token`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    return await res.json();
  },

  async refreshToken(): Promise<Res> {
    const res = await fetch(`${config.API_ENDPOINT}/auth/token`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    });

    return await res.json();
  },
};

export default AuthApiService;
