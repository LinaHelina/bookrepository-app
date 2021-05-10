import logo from './logo.svg';
import './App.css';
import {Home} from './components/HomePage';
import {Category} from './Category';
import {Book} from './Book';
import {Navigation} from './Navigation';
import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { NavMenu } from './components/NavigationBar';
import {Login} from './components/SignInPage';
import {Signup} from './components/SignUpPage';


class App extends React.Component {


  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }


  addToCart(item) {
    console.log('cART');
  }

  handleLogin() {
    console.log("login is working");
  }


  render() {
    return (
      <BrowserRouter>
      <Fragment>
        <NavMenu/>

        <Route path='/' render={props => <Home {...props} addToCart={this.addToCart} />} />


        <Route path='/login' render={props => <Login {...props} handleLogin={this.handleLogin} />} />
        <Route path='/signup' component={Signup} />
      </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
