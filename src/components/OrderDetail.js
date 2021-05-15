import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/OrderDetail.css';

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
                            <span className="bose-orderDetail__headerText"><b>Order number:</b>20192020{or.OrderId}</span>
                        </p>
                        <div className="bose-orderDetail__summary">
                            <p className="bose-orderDetail__summarySection">
                                <b className="bose-orderDetail__summarySectionTitle">Payment:</b>
                                Visa<br />
                                {or.CardName}<br/>
                                xxxx-xxxx-xxxx-{or.CardNumber.slice(-4)}
                            </p>

                            <p className="bose-orderDetail__summarySection">
                                <b className="bose-orderDetail__summarySectionTitle">Billing address:</b>
                                    {or.OrderName}<br />
                                    {or.OrderShipAddress1}<br />
                                    {or.OrderShipCity}<br />                            
                            </p>
                            <div className="bose-orderDetail__summarySection">
                                <b className="bose-orderDetail__summarySectionTitle">Order summary:</b>
                                <div className="bose-orderDetail__priceSummary">
                                    <div className="bose-orderDetail__priceRow">
                                            <span>Total:</span><span>${or.OrderTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            </div>

                            {or.OrderDetails.map(item => (
                                <div className="bose-orderDetail__items">
                                    <div className="bose-orderDetail__item">
                                        <div className="bose-orderDetail__itemSection bose-orderDetail__itemSection--product">
                                            <img className="bose-orderDetail__itemImage" src={item.ProductUrl}/>
                                            <p><b>{item.ProductName}</b></p>
                                            Black
                                        </div>

                                        <div className="bose-orderDetail__itemSection--status">
                                            <p><b>Quantity:</b></p>
                                            {item.Quantity}
                                        </div>

                                        <div className="bose-orderDetail__itemSection--status">
                                            <p><b>Price:</b></p>
                                            ${item.SalePrice}
                                        </div>

                                        <div className="bose-orderDetail__itemSection bose-orderDetail__itemSection--status">
                                            <p><b>Status:</b></p>
                                            Processing
                                        </div>

                                        <div className="bose-orderDetail__itemSection">
                                            <b>Shipping address:</b><br />
                                            {or.OrderName}<br />
                                            {or.OrderShipAddress1}<br />
                                            {or.OrderShipCity}<br /> 
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                
                            <Link style={{textAlign:"center"}} to="/history">
                                     <button  type="button" className="btn btn-success" style={{backgroundColor:'#56baed'}}>ORDER HISTORY</button>
                            </Link>
            </div>
        );
    }
}