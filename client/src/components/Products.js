import React, { Fragment } from 'react';

import Product from './Product';
import '../App.css';

const Products = ({ products, reachedTheEnd }) => (
    <div className="product-container">
        {products.map((product, key) => (
            <Fragment key={key}>
                <Product product={product} products={products}/>
            </Fragment>
        ))}
    </div>
);

export default Products;