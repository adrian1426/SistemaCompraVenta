import jwtDecode from 'jwt-decode';

export default class AuthService {

  constructor(domain) {
    this.domain = domain || process.env.REACT_APP_DOMAIN;
    this.login = this.login.bind(this);
    this.requestFetch = this.requestFetch.bind(this);
    this.getProfileDecode = this.getProfileDecode.bind(this);
  }

  isLoggedIn() {
    return !!this.getToken();
  };

  setToken(token) {
    localStorage.setItem('token', token);
  };

  getToken() {
    return localStorage.getItem('token');
  };

  setUser(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };

  getUser() {
    return JSON.parse(localStorage.getItem('usuario'));
  };

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  };

  getUserRol() {
    const user = this.getUser();

    if (user) {
      return user.rol;
    } else {
      return false;
    }
  };

  async login(email, password) {
    return this.requestFetch('/usuario/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        if (response.message !== 'Password Incorrecto' && response.message !== 'No existe el usuario') {
          this.setToken(response.token);
          this.setUser(response.usuario);
          return Promise.resolve(response);
        } else {
          console.log(response.message);
        }
      })
      .catch(error => console.log(error));
  };

  async requestFetch(urlRelative, options) {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (this.isLoggedIn()) {
      headers['token'] = this.getToken();
    }

    return fetch(`${this.domain}${urlRelative}`, {
      headers,
      ...options
    })
      .then(response => response.json())
      .catch(error => Promise.reject(error));
  };

  getProfileDecode() {
    return jwtDecode(this.getToken());
  };

};