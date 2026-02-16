const TOKEN_KEY = 'demo_token';
const USER_KEY = 'demo_user';

export const authService = {
  login(email: string, _password: string): string {
    // Dummy authentication - accept any credentials
    const token = 'demo_token';
    const user = { email, name: 'Demo' };

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return token;
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser(): { email: string; name: string } | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
