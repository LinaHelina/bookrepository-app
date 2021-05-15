import { Link } from 'react-router-dom';
import React from 'react';

export default function CartTotal({ handleClearCart, carts }) {
    const total = carts.reduce((sum, i) => (sum += i.quantity * i.productPrice), 0);
    return (
        <div className="container">
            <div className="row">
                <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalized text-right">
                <hr/>
                    <Link to="/cart">
                        <button
                            className="btn btn-outline-danger text-uppercase mb-3 px-5"
                            type="button"
                            onClick={handleClearCart}
                        >
                            Clear Cart
                    </button>
                    </Link>
                    <h5>
                        <span className="text-title">Total: </span>
                        <strong>$ {total}</strong>
                    </h5>


                    <Link to="/checkout">
                        <button
                            className="btn btn-outline-danger text-uppercase mb-3 px-5"
                            type="button"
                            
                        >
                            Begin to checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}