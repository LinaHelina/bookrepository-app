import logo from './logo.svg';
import './App.css';
import {Home} from './components/HomePage';
import {Category} from './adminComponents/Category';
import {Book} from './adminComponents/Book';
import {Navigation} from './adminComponents/Navigation';
import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { NavMenu } from './components/NavigationBar';
import {Login} from './components/SignInPage';
import {Signup} from './components/SignUpPage';


class App extends React.Component {

  static displayName = App.name;

  constructor(props) {
    super(props);
    if (localStorage.getItem('id_token') === null) // no token in local storage
    this.state = {
        isLogin: false,
    };
    else
    this.state = {
        isLogin: true,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }


  addToCart(item) {
    console.log('cART');
  }

  handleLogin() {
    console.log("login is working");
    this.setState({ isLogin: !this.state.isLogin });
  }

  handleLogout() {
    if (localStorage.getItem('id_token') !== null) { // if logged in
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.setState({ isLogin: !this.state.isLogin });
    }      
}


  render() {
    return (
      <BrowserRouter>
      <Fragment>
        <NavMenu handleLogout={this.handleLogout} isLogin={this.state.isLogin}/>

        <Route path='/' render={props => <Home {...props} addToCart={this.addToCart} />} />


        <Route path='/login' render={props => <Login {...props} handleLogin={this.handleLogin} />} />
        <Route path='/signup' component={Signup} />
      </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
