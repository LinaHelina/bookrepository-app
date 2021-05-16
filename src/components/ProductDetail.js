import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/ProductDetail.css';
import NotificationAlert from 'react-notification-alert';

var success = { place: 'tl', message: (<div>Item added successful</div>), type: "success", icon: "now-ui-icons ui-1_bell-53", autoDismiss: 2 };
var unsuccess = { place: 'tl', message: (<div>Please login to start shopping</div>), type: "danger", icon: "now-ui-icons ui-1_bell-53", autoDismiss: 2 };


export class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            obj: [],
            visible: false
        };
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(item) {
        if (localStorage.getItem("id_token")!=null) { 
            if (localStorage.getItem("cart") != "[]") {
                var myJsonObject = (item); 
                myJsonObject.quantity = 1; 
                myJsonObject = JSON.stringify(myJsonObject); 
                var items = localStorage.getItem("cart").slice(0, -1).concat(',' + myJsonObject) + "]"; 
                localStorage.setItem("cart", items); 
            }
            else {
                var myJsonObject = (item); 
                myJsonObject.quantity = 1; 
                myJsonObject = "[" + JSON.stringify(myJsonObject) + "]"; 
                localStorage.setItem("cart", myJsonObject);
            }
        }
    }

    getProductToAddCart() {
        const id = localStorage.getItem("PID");
        fetch(process.env.REACT_APP_API+"Home/Product/" + id)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    obj: JSON.parse('[' + JSON.stringify(result) + ']')
                })
            })
    }


    componentDidMount() {
        const id = localStorage.getItem("PID");
        fetch(process.env.REACT_APP_API+"home/Products/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: JSON.parse('[' + JSON.stringify(result) + ']')
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
        );
        this.getProductToAddCart();
        
    }

    onShowAlert = () => {
        this.setState({ visible: true }, () => {
            window.setTimeout(() => {
                this.setState({ visible: false })
            }, 2000)
        });
    }
    noti() {
        if (localStorage.getItem("id_token") !== null)
            this.refs.notify.notificationAlert(success);
        else
            this.refs.notify.notificationAlert(unsuccess)
    }


    render() {
        const { error, isLoaded, items, obj } = this.state;           
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="container">
                     <NotificationAlert ref="notify" />
                    <div className="text-center">
                        {items.map(item => (
                            <h1>{item.ProductName}</h1>

                        ))}
                        <div id="myCarousel" className="carousel slide" data-ride="carousel">
                            {items.map(item => (
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <img src={item.ProductImage} style={{ width: '100%', maxHeight: '400px', objectFit: "cover" }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h1 style={{ color: 'white' }}>TEXT </h1>

                    <div className="container">
                        {items.map(item => (
                            <div className="panel panel-default">
                                <div className="panel-heading"><b>Annotation: {item.name}</b></div>
                                <div className="panel-body"> {item.ShortDescription}</div>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ color: 'white' }}>TEXT </h3>   

                    <table className="table  table-hover">
                        <tbody>
                            {items.map(item => (<tr><td>PublicationDate</td><td>{item.PublicationDate}</td></tr>))}
                            {items.map(item => (<tr><td>PageAmount</td><td>{item.PageAmount}</td></tr>))}
                            {items.map(item => (<tr><td>Publisher</td><td>{item.Publisher}</td></tr>))}
                            {items.map(item => (<tr><td>Category</td><td>{item.Category}</td></tr>))}
                            {items.map(item => (<tr><td>Language</td><td>{item.ProductLanguage}</td></tr>))}
                            {items.map(item => (<tr><td>ISBN</td><td>{item.IsbnNumber}</td></tr>))}            
                        </tbody>
                    </table> 

                    <h3 style={{ color: 'white' }}>TEXT </h3>   
                    
                        <div className="text-center">
                            <Link style={{textAlign:"center"}} to="/">
                                <button  type="button" className = "btn btn-warning" style={{backgroundColor:'#56baed'}}>BACK TO HOME</button>
                            </Link>
                        </div>


                        <h1 style={{ color: 'white' }}>TEXT </h1>

               </div>
            );
        }
    }
}