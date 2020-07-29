import React, { Component } from 'react';
import AuthService from './services/AuthService';
import Login from './components/Login/Login';
import UserNav from './components/user-nav/UserNav';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.auth = new AuthService();
    this.state = {
      auth: this.auth.isLoggedIn()
    };
  }

  render() {
    const { auth } = this.state;

    if (auth) {
      return <UserNav onAuthChange={this.onAuthChange} />;
    }
    else {
      return (
        <Router>
          <Switch>
            <Route
              path='/Login'
              render={renderProps => <Login {...renderProps} onAuthChange={this.onAuthChange} />}
            />
            <Redirect from='*' to='/Login' />
          </Switch>
        </Router>
      );
    }
  }

  onAuthChange = () => {
    this.setState({
      auth: this.auth.isLoggedIn()
    });
  };
}

export default App;
