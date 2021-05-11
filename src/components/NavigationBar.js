import React, { Component} from 'react';
import { Collapse, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './styles/NavigationMenu.css';

export class NavMenu extends Component {

    static displayName = NavMenu.name;

    constructor() {
        super();
   
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = { collapsed: true };
    }
   
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }


    render(){
        return(
            <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-inverse border-bottom box-shadow mb-1" >
                <Link to={"/"}>     
                    <img id="logo-nav" className="img-fluid img-responsive" src="https://d3ogvdx946i4sr.cloudfront.net/assets/v2.25.1/img/logo.svg" alt="logo" />
                </Link>

                <NavbarToggler onClick={this.toggleNavbar} className="ml-auto" id="toggler" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse text-dark" isOpen={!this.state.collapsed} navbar>
                         <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-light" to="/">Home</NavLink>
                        </NavItem>
                        {this.props.isLogin === false && // if not log in yet
                                 <NavItem>
                             <NavLink tag={Link} className="text-light" to="/login">Login/Register</NavLink>
                                 </NavItem>
                             }
                             {this.props.isLogin === true && //if status is logged in
                                 <NavItem onClick={this.props.handleLogout}>
                             <NavLink tag={Link} className="text-light" to="/">Log Out</NavLink>
                                 </NavItem>
                             }
                             {this.props.isLogin === true && //if status is logged in
                                 <NavItem>
                             <NavLink tag={Link} className="text-light" to="/account">Account</NavLink>
                                 </NavItem>
                             }

                    </ul>
                    
                    </Collapse>
                    <Link to="/" className="cccard">
                    <button id="cart" type="submit"><i className="glyphicon ml-auto glyphicon-shopping-cart" /> Cart</button>
                    </Link>

            </Navbar>
        )
    }

}