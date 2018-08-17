import React from 'react';

import Product from './Product';
import '../App.css';

const Products = ({ products }) => (
    <div className="product-container">
        {products.map((product, key) => (
            <React.Fragment key={key}>
                <Product product={product} products={products}/>
            </React.Fragment>
        ))}
    </div>
);

export default Products;