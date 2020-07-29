import AuthService from './AuthService';

export default class Requests {

  constructor() {
    this.authService = new AuthService();
  }

  handleError(error) {
    console.error('Error de request: ', error);
    return Promise.reject(false);
  }

  add(urlRelative, data) {
    return this.authService.requestFetch(urlRelative, {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .catch(this.handleError);
  }

  query(urlRelative) {
    return this.authService.requestFetch(urlRelative, {
      method: 'GET'
    })
      .catch(this.handleError);
  }

  delete(urlRelative, id) {
    return this.authService.requestFetch(urlRelative, {
      method: 'DELETE',
      body: JSON.stringify({ _id: id })
    })
      .catch(this.handleError);
  }

  activateDeactivate(urlRelative, id) {
    return this.authService.requestFetch(urlRelative, {
      method: 'PUT',
      body: JSON.stringify({ _id: id })
    })
      .catch(this.handleError);
  }

  update(urlRelative, data) {
    return this.authService.requestFetch(urlRelative, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
      .catch(this.handleError);
  }

  list(urlRelative) {
    return this.authService.requestFetch(urlRelative, {
      method: 'GET'
    })
      .catch(this.handleError);
  }
};