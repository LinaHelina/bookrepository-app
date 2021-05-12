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
import "react-notification-alert/dist/animate.css";
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';

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
        cartChange: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.handleSaveCart = this.handleSaveCart.bind(this);
  }


  addToCart(item) {
    if (this.state.isLogin === true) { // if loggin
        if (localStorage.getItem("cart") !== "[]") {
            var myJsonObject = JSON.parse(item); 
            myJsonObject.quantity = 1;
            myJsonObject = JSON.stringify(myJsonObject); 
            var items = localStorage.getItem("cart").slice(0, -1).concat(',' + myJsonObject) + "]";
            localStorage.setItem("cart", items); 
        }
        else {
            var myJsonObject = JSON.parse(item); 
            myJsonObject.quantity = 1; 
            myJsonObject = "[" + JSON.stringify(myJsonObject) + "]"; 
            localStorage.setItem("cart", myJsonObject);
        }
    }
  }

  handleSaveCart() {
    const cartSave = localStorage.getItem('cart');
    const id = JSON.parse(localStorage.getItem('profile')).CustomerId;
    axios.post((process.env.REACT_APP_API+'users/' + id + '/savecart'), JSON.parse(cartSave));
  }


  handleLogin() {
    console.log("login is working");
    this.setState({ isLogin: !this.state.isLogin });
  }

  handleLogout() {
    if (localStorage.getItem('id_token') !== null) { 
        this.handleSaveCart(); 
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        localStorage.removeItem('cart');
        localStorage.removeItem('PID');
        this.setState({ isLogin: !this.state.isLogin });
    }      
  }


  render() {
    return (
      <BrowserRouter>
      <Fragment>
        <NavMenu handleLogout={this.handleLogout} isLogin={this.state.isLogin}/>

        <Route exact path='/' render={props => <Home {...props} addToCart={this.addToCart} />} />


        <Route path='/login' render={props => <Login {...props} handleLogin={this.handleLogin} />} />
        <Route path='/signup' component={Signup} />
        <Route path='/productdetail' component={ProductDetail} />
        <Route path='/cart' render={props => <Cart {...props} isLogin={this.state.isLogin} cartChange={this.state.cartChange} />} />
      </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
