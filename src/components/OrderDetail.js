import React, { Component } from 'react';
import './OrderDetail.css';

export class OrderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            detail: []
        };
    }


    componentDidMount() {
        const id = JSON.parse(localStorage.getItem('profile')).CustomerId;

        fetch(process.env.REACT_APP_API+"user/" + id + "/ordershistory")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        detail: result
                    });
                    
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
        );
    }

    render() {

        const OID = localStorage.getItem("OID");
        const order = this.state.detail.filter(x => x.OrderId == OID);
        console.log("detail", order);
        return (

            <div className="container">
                {order.map(or => (
                    <div>
                    <div className="page-header"><h1>ORDER DETAILS</h1></div>
                    <div className="bose-orderDetail">
                        <p>
                            <span className="bose-orderDetail__headerText"><b>Date:</b> {or.OrderDate}</span>
                            <span className="bose-orderDetail__separator" />
                            <span className="bose-orderDetail__headerText"><b>Order number:</b> KNN20192020{or.OrderId}</span>
                            <button className="bose-orderDetail__cancelButton">Cancel order</button>
                        </p>
                        <div className="bose-orderDetail__summary">
                            <p className="bose-orderDetail__summarySection">
                                <b className="bose-orderDetail__summarySectionTitle">Payment:</b>
                                Visa<br />
                                {or.cardName}<br/>
                                xxxx-xxxx-xxxx-{or.cardNumber.slice(-4)}
                            </p>

                            <p className="bose-orderDetail__summarySection">
                                <b className="bose-orderDetail__summarySectionTitle">Billing address:</b>
                                    {or.orderName}<br />
                                    {or.orderShipAddress1}<br />
                                    {or.orderShipCity}<br />                            
                            </p>
                            <div className="bose-orderDetail__summarySection">
                                <b className="bose-orderDetail__summarySectionTitle">Order summary:</b>
                                <div className="bose-orderDetail__priceSummary">
                                    <div className="bose-orderDetail__priceRow">
                                        <span>Subtotal:</span><span>${(or.orderTotal/(108.5/100)).toFixed(2)}</span>
                                    </div>
                                    <div className="bose-orderDetail__priceRow">
                                        <span>Shipping:</span><span>FREE</span>
                                    </div>
                                    <div className="bose-orderDetail__priceRow">
                                            <span>Tax:</span><span>${(or.orderTotal - (or.orderTotal / (108.5 / 100))).toFixed(2)}</span>
                                    </div>
                                    <div className="bose-orderDetail__priceRow">
                                            <span>Total:</span><span>${or.orderTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            </div>

                            {or.orderDetails.map(item => (
                                <div className="bose-orderDetail__items">
                                    <div className="bose-orderDetail__item">
                                        <div className="bose-orderDetail__itemSection bose-orderDetail__itemSection--product">
                                            <img className="bose-orderDetail__itemImage" src={item.ProductUrl}/>
                                            <p><b>{item.ProductName}</b></p>
                                            Black
                                        </div>

                                        <div className="bose-orderDetail__itemSection--status">
                                            <p><b>Quantity:</b></p>
                                            {item.quantity}
                                        </div>

                                        <div className="bose-orderDetail__itemSection--status">
                                            <p><b>Price:</b></p>
                                            ${item.salePrice}
                                        </div>

                                        <div className="bose-orderDetail__itemSection bose-orderDetail__itemSection--status">
                                            <p><b>Status:</b></p>
                                            Processing
                                        </div>

                                        <div className="bose-orderDetail__itemSection">
                                            <b>Shipping address:</b><br />
                                            {or.orderName}<br />
                                            {or.orderShipAddress1}<br />
                                            {or.orderShipCity}<br /> 
                                        </div>

                                        <div className="bose-orderDetail__itemSection">                                
                                            <a className="bose-orderDetail__itemAction">Return</a>
                                            <a className="bose-orderDetail__itemAction">Support</a>
                                            <a className="bose-orderDetail__itemAction">Write a review</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}