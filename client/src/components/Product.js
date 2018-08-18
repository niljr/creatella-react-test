import React, { Component, Fragment } from 'react';

import { getDate, formatPrice } from '../helpers';
import '../App.css';

class Product extends Component {
    render() {
        const { face, size, price, date, ads } = this.props.product
        return (
            <Fragment>
                {!ads ? 
                <div>
                    <div className="product-face" style={{ fontSize: size }}> {face} </div>
                    <div className="product-details">
                        <span>Size: {size}</span>
                        <span>Date: {getDate(date)}</span>
                        <span className='price'>Price: {formatPrice(price)}</span>
                    </div>
                </div>
                :
                <div className='ads-container'>
                    <img src={this.props.product.ads} alt='ads' />
                </div>
                }
            </Fragment>
        );
    }
}

export default Product;
