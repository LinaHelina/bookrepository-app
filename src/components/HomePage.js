import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import './styles/HomeProducts.css';

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

    componentDidMount() {

        fetch(process.env.REACT_APP_API+'home/Products')
        .then(response=>response.json())
        .then(data=>{
            this.setState({items:data});
        });

/*
        fetch(process.env.REACT_APP_API+"home/Products")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )*/


    }

    render(){
        const {items} = this.state
        return(
            <Fragment>
                  
                <div className="row">                 
                {items.map(item => (
                        <div id="card-wrapper" className="cwrapper">
                            
                            <div id="cproduct-img" className="cproduct-img">
                                <Link to='/productdetail'>
                                    <img id="thumbnail" src={item.ProductImageUrl} />
                                </Link>
                            </div>
                            

                            <div id="product-info" className="product-info">
                                <div id="product-text" className="product-text">
                                    <Link to='/productdetail'>
                                        <h1><b>{item.ProductName}</b></h1>
                                    </Link>
                                    <br/>
                                    <h2><p>{item.ProductAuthor}</p></h2>
                                </div>
                                <div className="product-price-btn">
                                    <p><span id="price" >${item.ProductPrice}</span></p>
                                    <button type="button">Add to cart</button>
                                </div>
                            </div>

                        </div>

                    ))}
                    </div>
                    </Fragment>
        )
    }

}