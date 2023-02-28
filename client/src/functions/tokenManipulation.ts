export function getToken() {
  if (localStorage.getItem('always') === 'true') {
    return localStorage.getItem('token');
  } else {
    return sessionStorage.getItem('token');
  }
}

export function setToken(token: string) {
  if (localStorage.getItem('always') === 'true') {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
}