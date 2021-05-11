import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import './styles/HomeProducts.css';
import NotificationAlert from 'react-notification-alert';

var success = { place: 'tl', message: (<div>Item added successful</div>), type: "success", icon: "now-ui-icons ui-1_bell-53", autoDismiss: 2 };
var unsuccess = { place: 'tl', message: (<div>Please login to start shopping</div>), type: "danger", icon: "now-ui-icons ui-1_bell-53", autoDismiss: 2 };

export class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            visible: false
        };
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

    componentDidMount() {

        fetch(process.env.REACT_APP_API+'home/Products')
        .then(response=>response.json())
        .then(data=>{
            this.setState({items:data});
        });
    }

    render(){
        const {items} = this.state
        return(
            <Fragment>

                <NotificationAlert ref="notify" />
                <div className="row">                 
                {items.map(item => (
                        <div id="card-wrapper" className="cwrapper">
                            
                            <div id="cproduct-img" className="cproduct-img">
                            <Link to='/productdetail' onClick={()=>localStorage.setItem("PID", item.ProductId)}>
                                    <img id="thumbnail" src={item.ProductImageUrl} />
                                </Link>
                            </div>
                            

                            <div id="product-info" className="product-info">
                                <div id="product-text" className="product-text">
                                <Link to='/productdetail' onClick={()=>localStorage.setItem("PID", item.ProductId)}>
                                        <h1><b>{item.ProductName}</b></h1>
                                    </Link>
                                    <br/>
                                    <h2><p>{item.ProductAuthor}</p></h2>
                                </div>
                                <div className="product-price-btn">
                                    <p><span id="price" >${item.ProductPrice}</span></p>
                                    <button onClick={() => { this.props.addToCart(JSON.stringify(item)); this.noti(); }} type="button">Add to cart</button>
                                </div>
                            </div>

                        </div>

                    ))}
                    </div>
                    </Fragment>
        )
    }

}