import React, { Component } from 'react';
import axios from 'axios';
import './styles/Checkout.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from 'reactstrap';
import CartItem from './Cart/CartItem';
import CartTotal from './Cart/CartTotal';
import { Cart } from './Cart';
import { Link } from 'react-router-dom';

export class Checkout extends Component {

    /*    constructor(props) {
            super(props)*/
    state = {
        Name: '', NameError: "",
        Address1: '', Address1Error: "",
        Address2: '', Address2Error: "",
        City: '', CityError: "",
        ValidateResult: {},
        cardname: "", CardNameError: "",
        cardnumber: "", CardNumberError: "",
        expmonth: "", ExpMonthError: "",
        expyear: "", ExpYearError: "",
        cvv: "", CvvError: ""
    }
    /*this.handleChange = this.handleChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);*/

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleClick = () => {
        const isValid = this.handleCheckPay();
        console.log(isValid)
        console.log(this.state.ValidateResult.address1);
        localStorage.setItem("ship", JSON.stringify(this.state));
        console.log('Stateeeee', this.state);
        if (isValid && this.state.ValidateResult.address1 !== null) {
            localStorage.setItem("confirm", JSON.stringify(this.state));
            this.props.history.push('/confirm');
        }
    }

    handleCheckShip = () => {
        let NameError = "", Address1Error = "";

        if (!this.state.Name) NameError = "* Name cannot be blank";
        if (!this.state.Address1) Address1Error = "* Address cannot be blank";


        if (NameError || Address1Error) {
            this.setState({ NameError: NameError, Address1Error: Address1Error });
            return false;
        } else {
            this.setState({ NameError: "", Address1Error: "" });
            return true;
        }
    }

    handleCheckPay = () => {
        let CardNameError = "", CardNumberError = "", ExpMonthError = "", ExpYearError = "", CvvError = "";

        if (!this.state.cardname) CardNameError = "* Card Name cannot be blank";
        if (!this.state.cardnumber) CardNumberError = "* Card Number cannot be blank";
        if ((!this.state.cardnumber.match(/^\d+$/) && this.state.cardnumber !== "") || this.state.cardnumber.length !== 16) CardNumberError = "* Please put 16 numbers from your card";
        if (!this.state.expmonth) ExpMonthError = "* Exp Month cannot be blank";
        if ((!this.state.expmonth.match(/^\d+$/) && this.state.expmonth !== "") || this.state.expmonth.length !== 2) ExpMonthError = "* Exp Month must be 2 digits";
        if (!this.state.expyear) ExpYearError = "* Exp Year cannot be blank";
        if (!this.state.expyear.match(/^\d+$/) && this.state.expyear !== "")  ExpYearError = "* Exp Year must be number";
        if (this.state.expyear.length !== 4 && this.state.expyear !== "") ExpYearError = "* Exp Year must be 4 digits";
        if (!this.state.cvv) CvvError = "* Cvv cannot be blank";
        if ((!this.state.cvv.match(/^\d+$/) && this.state.cvv !== "") || this.state.cvv.length !== 3) CvvError = "* Cvv must be 3 digits";      

        if (CardNameError || CardNumberError || ExpMonthError || ExpYearError || CvvError) {
            this.setState({ CardNameError: CardNameError, CardNumberError: CardNumberError, ExpMonthError: ExpMonthError, ExpYearError: ExpYearError, CvvError: CvvError });
            return false;
        } else {
            this.setState({ CardNameError: "", CardNumberError: "", ExpMonthError: "", ExpYearError: "", CvvError: "" });
            return true;
        }
    }

    //get user info first
    componentDidMount() {
        //get id from profile after login

        const id = JSON.parse(localStorage.getItem("profile")).CustomerId;
        axios.get(process.env.REACT_APP_API+"user/" + id)
            .then(res => {
                this.setState({ Name: res.data.Fullname, Address1: res.data.Address, City:res.data.City })
            })
            .catch(function (error) {
                console.log('Fetch error: ' + error.message);
            });

    }

    handleValidate = event => {
        event.preventDefault();
        const isValid = this.handleCheckShip();
        if (isValid) {
            axios.post('/api/validate/validate', this.state)
                .then(response => {
                    this.setState({ ValidateResult: response.data });
                    localStorage.setItem("ship", JSON.stringify(response.data));
                    console.log(this.state.ValidateResult)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    };

    render() {
        const { Name, Address1,  City,  cardname, cardnumber, expmonth, expyear, cvv } = this.state;
        const cart = JSON.parse(localStorage.getItem("cart"));
        const total = cart.reduce((sum, i) => (sum += i.quantity * i.productPrice), 0);
        return (
            <div className="row rrr">
                <div className="page-header" style={{ marginLeft: '50px' }}><h1>CHECKOUT INFORMATION</h1></div>
                <div className="col-75 c75">
                    <div className="container ctn">
                        <form onSubmit={this.handleValidate}>

                            <div className="row rrr">
                                <div className="col-50 c50">
                                    <h3>Shipping Address</h3>
                                    <label><i className="fa fa-user"></i> Full Name</label>
                                    <input onChange={this.handleChange} value={Name} defaultValue={Name} type="text1" id="fname" name="Name" placeholder="Name Surname" />
                                    <div style={{ fontSize: 12, color: "red" }}>{this.state.NameError}</div>
                                    <label><i className="fa fa-address-card-o"></i> Address</label>
                                    <input onChange={this.handleChange} value={Address1}  defaultValue={Address1} type="text1" id="adr1" name="Address1" placeholder="Home number, Street Name" />
                                    <div style={{ fontSize: 12, color: "red" }}>{this.state.Address1Error}</div>
                                    <label><i className="fa fa-institution"></i> City</label>
                                    <input onChange={this.handleChange} value={City} defaultValue={City}  type="text1" id="city" name="City" placeholder="City name" />

                                </div>

                                <div className="col-50 c50">
                                    <h3>Payment</h3>
                                    <label>Name on Card</label>
                                    <input onChange={this.handleChange} value={cardname} type="text1" id="cname" name="cardname" placeholder="Name Surname" />
                                    <div style={{ fontSize: 12, color: "red" }}>{this.state.CardNameError}</div>
                                    <label>Credit card number</label>
                                    <input onChange={this.handleChange} value={cardnumber} type="text1" id="ccnum" name="cardnumber" placeholder="XXXX-XXXX-XXXX-XXXX" />
                                    <div style={{ fontSize: 12, color: "red" }}>{this.state.CardNumberError}</div>
                                    <label>Exp Month</label>
                                    <input onChange={this.handleChange} value={expmonth} type="text1" id="expmonth" name="expmonth" placeholder="01" />
                                    <div style={{ fontSize: 12, color: "red" }}>{this.state.ExpMonthError}</div>
                                    <div className="row rrr">
                                        <div className="col-50 c50">
                                            <label>Exp Year</label>
                                            <input onChange={this.handleChange} value={expyear} type="text1" id="expyear" name="expyear" placeholder="2021" />
                                            <div style={{ fontSize: 12, color: "red" }}>{this.state.ExpYearError}</div>
                                        </div>
                                        <div className="col-50 c50">
                                            <label>CVV</label>
                                            <input onChange={this.handleChange} value={cvv} type="text1" id="cvv" name="cvv" placeholder="XXX" />
                                            <div style={{ fontSize: 12, color: "red" }}>{this.state.CvvError}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <button style={{textAlign: "center"}} className="btn-block" id="continue-checkout" onClick={() => this.handleClick() }>Continue to checkout</button>

                        </form>
                    </div>
                </div>

                <div className="col-25 ccc">
                    <div className="container">
                        <p2 className="page-header">YOUR CART</p2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Items</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    <tr>
                                        <td>{item.productName}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.productPrice}</td>
                                    </tr>
                                ))}
                                <div className="bose-orderDetail__summarySection">
                                    <b className="bose-orderDetail__summarySectionTitle">Order summary:</b>
                                <div className="bose-orderDetail__priceRow">
                                    <span>Total:</span><span>${total.toFixed(2)}</span>
                                </div>
                                </div>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

        );
    }
}
