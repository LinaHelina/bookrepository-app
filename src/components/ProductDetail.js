import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/ProductDetail.css';

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
      console.log('Added to cart');
    }


    componentDidMount() {
        const id = 1;
        fetch("/api/Home/Products/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: JSON.parse('[' + JSON.stringify(result) + ']')
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
        );
        
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
                    <div className="container">
                        {items.map(item => (
                            <h1>{item.name}</h1>

                        ))}
                        <div id="myCarousel" className="carousel slide" data-ride="carousel">
                            {/* Indicators */}
                            <ol className="carousel-indicators">
                                <li data-target="#myCarousel" data-slide-to={0} className="active" />
                                <li data-target="#myCarousel" data-slide-to={1} />
                                <li data-target="#myCarousel" data-slide-to={2} />
                            </ol>
                            {/* Wrapper for slides */}
                            {items.map(item => (
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <img src={item.imgUrl1} style={{ width: '100%', maxHeight: '400px', objectFit: "cover" }} />
                                    </div>
                                    <div className="item">
                                        <img src={item.imgUrl2} style={{ width: '100%', maxHeight: '400px', objectFit: "cover" }} />
                                    </div>
                                    <div className="item">
                                        <img src={item.imgUrl3} style={{ width: '100%', maxHeight: '400px', objectFit: "cover" }} />
                                    </div>
                                </div>
                            ))}
                            {/* Left and right controls */}
                            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                                <span className="glyphicon glyphicon-chevron-left" />
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="right carousel-control" href="#myCarousel" data-slide="next">
                                <span className="glyphicon glyphicon-chevron-right" />
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>

                    {obj.map(item => (
                        <div className="text-center">
                            <button  type="button" className="btn btn-warning">Add To Cart</button>
                        </div>
                    ))}

                    <div className="container">
                        {items.map(item => (
                            <div className="panel panel-default">
                                <div className="panel-heading"><b>Introduction: {item.name}</b></div>
                                <div className="panel-body"></div>
                            </div>
                        ))}
                    </div>

                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Features</th>
                                <th>Specs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (<tr><td>Operating System</td><td>{item.PublicationDate}</td></tr>))}
                                                   </tbody>
                    </table>    
                    
                    {obj.map(item => (
                        <div className="text-center">
                            <Link style={{textAlign:"center"}} to="/">
                                <button  type="button" className="btn btn-success">BACK TO HOME</button>
                            </Link>
                        </div>
                    ))}

               </div>
            );
        }
    }
}