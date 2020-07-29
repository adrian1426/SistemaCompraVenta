import React, { Component } from 'react'
import AuthService from '../../services/AuthService';
import { Card, CardHeader, CardContent, TextField, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Styles from './Login.module.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.authService = new AuthService();
  }

  render() {
    return (
      <Card
        style={{
          width: '40%',
          height: '30%',
          marginLeft: 'calc(50% - 20%)',
          marginTop: '12%'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <CardHeader title='Acceso al sistema' className={Styles.fondoTituloLogin} />
        </div>
        <CardContent>
          <form onSubmit={this.handleSubmit}>
            <TextField
              type='text'
              label='Email'
              name='email'
              onChange={this.handleChange}
              style={{
                width: '100%'
              }}
            />

            <br />

            <TextField
              type='password'
              label='Password'
              name='password'
              onChange={this.handleChange}
              style={{
                width: '100%'
              }}
            />

            <br />
            <br />

            <div style={{ textAlign: 'right' }}>
              <Button type='submit' variant='contained' className={Styles.fondoTituloLogin}>Ingresar</Button>
            </div>

          </form>
        </CardContent>
      </Card>
    );
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    this.authService.login(email, password)
      .then(response => {
        this.props.onAuthChange();
        this.props.history.replace('/');
      })
      .catch(error => console.log(error));
  };
};

export default withRouter(Login);