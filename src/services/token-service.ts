import jwtDecode from 'jwt-decode';

import config from 'src/config';

const { TOKEN_KEY } = config;
const _TEN_SECONDS = 10e3;
let _timeoutId: NodeJS.Timeout;

type Payload = {
  exp: number;
  user_id: number;
  name: string;
  sub: string;
};

const TokenService = {
  saveAuthToken(token: string): void {
    window.localStorage.setItem(TOKEN_KEY, token);
  },

  getAuthToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  },

  clearAuthToken(): void {
    window.localStorage.removeItem(TOKEN_KEY);
  },

  hasAuthToken(): boolean {
    return !!TokenService.getAuthToken();
  },

  parseJwt(jwt: string): Payload {
    return jwtDecode(jwt);
  },

  parseAuthToken(): Payload | null {
    const authToken = TokenService.getAuthToken();

    if (!authToken) return null;
    return TokenService.parseJwt(authToken);
  },

  _getMsUntilExpiry(payload: Payload | null): number | null {
    if (!payload) return null;
    return payload.exp * 1000 - Date.now();
  },

  queueCallbackBeforeExpiry(callback: () => void): void {
    const msUntilExpiry = TokenService._getMsUntilExpiry(
      TokenService.parseAuthToken(),
    );

    if (msUntilExpiry) {
      _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS);
    }
  },

  clearCallbackBeforeExpiry(): void {
    clearTimeout(_timeoutId);
  },
};

export default TokenService;
