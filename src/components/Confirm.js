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
        const total = (items.reduce((sum, i) => (sum += i.quantity * i.productPrice), 0));
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
                        {items.map(item => (<tr><td>{item.productName}</td><td>{item.quantity}</td><td>{item.productPrice}</td></tr>))}
                        <h3 style={{ color: 'white' }}>TEXT </h3>   
                        <b>Total: $ </b>{total.toFixed(2)}<br/>
                       
                    </tbody>
                </table>
                <hr/>
                    <div className="panel panel-success">
                    <div className="panel-heading"><b>Perconal data & Shipping Address: </b></div>
                    <div className="panel-body">

                            {ship.Name}<br/>
                            {ship.Address1}<br />
                            {ship.City}<br />
                    </div>
                    </div>
                    <hr/>
                    <div className="panel panel-success">
                        <div className="panel-heading"><b>Payment info: </b></div>
                        <div className="panel-body">
                            {confirm.cardname}<br />
                            xxxx-xxxx-xxxx-{confirm.cardnumber.slice(-4)}<br />
                            {confirm.expyear}<br />
                        </div>
                    </div>

                    <h3 style={{ color: 'white' }}>TEXT </h3>   
                <Link to='/thankyou'  >
                        <button  onClick={() => this.handleOrderHistory()} type="button" class="btn btn-success" style={{backgroundColor:'#56baed'}}>Pay now</button>
                    </Link>
                    </Container>
            </div>
        );
    }
}