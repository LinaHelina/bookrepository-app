import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container } from 'reactstrap';

export class Confirm extends Component {


    handleOrderHistory() {
        const id = JSON.parse(localStorage.getItem('profile')).CustomerId;
        var confirm = JSON.parse(localStorage.getItem("confirm"));
        var itemsPaid = JSON.parse(localStorage.getItem("cart"));
        var history = JSON.parse(localStorage.getItem("ship"));
        history.detail = itemsPaid; // add paid items into history object
        history.cardnumber = confirm.cardnumber;
        history.cardname = confirm.cardname;
        console.log("history to post", history);
        localStorage.setItem("order", JSON.stringify(history));
        localStorage.setItem("cart", JSON.stringify([])); // set cart empty after purchase
        axios.post(process.env.REACT_APP_API+'user/'+ id +'/savehistory', history); // save to history database
    }




    render() {
        const confirm = JSON.parse(localStorage.getItem("confirm"));
        const ship = JSON.parse(localStorage.getItem("ship"));
        const items = JSON.parse(localStorage.getItem("cart"));
        const sub = (items.reduce((sum, i) => (sum += i.quantity * i.ProductPrice), 0));
        const tax = sub * 8.5 / 100;
        const total = sub + tax;
        return (
            <div>
                <Container>
                <h1 className="page-header">CONFIRM YOUR PURCHASE</h1>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Items</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (<tr><td>{item.ProductName}</td><td>{item.quantity}</td><td>{item.ProductPrice}</td></tr>))}
                        <b>Sub: $ </b>{sub.toFixed(2)}<br/>
                        <b>Tax: $ </b>{tax.toFixed(2)}<br/>
                        <b>Total: $ </b>{total.toFixed(2)}<br/>
                    </tbody>
                </table>

                    <div className="panel panel-success">
                    <div className="panel-heading"><b>Your Shipping Address: </b></div>
                    <div className="panel-body">

                            {ship.name}<br/>
                            {ship.address1}<br />
                            {ship.city}<br />
                    </div>
                    </div>

                    <div className="panel panel-success">
                        <div className="panel-heading"><b>Your Payment: </b></div>
                        <div className="panel-body">
                            Visa<br/>
                            {confirm.cardname}<br />
                            xxxx-xxxx-xxxx-{confirm.cardnumber.slice(-4)}<br />
                            {confirm.expyear}<br />
                        </div>
                    </div>


                <Link to='/thankyou'>
                        <button onClick={() => this.handleOrderHistory()} type="button" class="btn btn-success">Pay now</button>
                    </Link>
                    </Container>
            </div>
        );
    }
}