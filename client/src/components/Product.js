import React from 'react';

import { getDate, formatPrice } from '../helpers';
import '../App.css';

class Product extends React.Component {
    render() {
        const { face, size, price, date, ads } = this.props.product
        return (
            <React.Fragment>
                {!ads ? 
                <div>
                    <div className="product-face" style={{ fontSize: size }}> {face} </div>
                    <div className="product-details">
                        <span>Size: {size}</span>
                        <span>Date: {getDate(date)}</span>
                        <span>Price: {formatPrice(price)}</span>
                    </div>
                </div>
                :
                <div className='ads-container'>
                    <img src={this.props.product.ads} />
                </div>
                }
            </React.Fragment>
        );
    }
}

export default Product;
