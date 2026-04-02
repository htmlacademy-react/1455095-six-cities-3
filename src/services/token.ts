const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
const USER_EMAIL_KEY_NAME = 'six-cities-email';

export const saveToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const getToken = (): string | null => localStorage.getItem(AUTH_TOKEN_KEY_NAME);

export const saveEmail = (email: string): void => {
  localStorage.setItem(USER_EMAIL_KEY_NAME, email);
};

export const getEmail = (): string | null => localStorage.getItem(USER_EMAIL_KEY_NAME);

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
  localStorage.removeItem(USER_EMAIL_KEY_NAME);
};
