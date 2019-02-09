// const authUrl = 'https://auth.lasfu.roro3.com/login';
const authUrl = 'http://devserver.my:4444/login';
const ACCESSTOKEN = 'accessToken';

export const fetchToken = async (email, password) => {
  const response = await fetch(authUrl, {
    method: 'POST',
    headers: {
      Authorization: 'Basic bG9uZ3Rlcm1fY2xpZW50OmFjbWVzZWNyZXQ=',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const json = await response.json();
  return json.tokens;
};

export const saveAccessToken = token => {
  if (token && token.length > 0) localStorage.setItem(ACCESSTOKEN, token);
};

export const getStoredAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESSTOKEN);
};
