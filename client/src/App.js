import React, { Component } from 'react';

import Filter from './components/Filter';
import Products from './components/Products';
import { ads, debounce, fetchproducts } from './helpers';
import './App.css';

class App extends Component {

  state = {
    products: {},
    filter: '',
    isLoading: true,
    loadingProduct: false,
    page: 1
  }

  componentDidMount() {
    const page = this.state.page;
    window.addEventListener("scroll", this.loadMoreProducts);

    fetch(`http://localhost:3000/api/products?_page=${page}&_limit=20`)
    .then(function(response) {
      return response.json();
    })
    .then(myJson => {
      const test = ads(myJson);
      this.setState({ products: test, isLoading: false, page: page + 1 } )
    });
    // console.log(fetchproducts(page));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  addFilter = filter => {
    const page = this.state.page;
    this.setState({ isLoading: true })
    fetch(`http://localhost:3000/api/products?_page=${page}&_limit=20&_sort=${filter}`)
    .then(function(response) {
      return response.json();
    })
    .then(filteredResult => {
      this.setState({ 
        products: ads(filteredResult), 
        filter, 
        isLoading: false, 
        page: page + 1 
      });
    })
  }
  
  fetchMoreProducts = () => {
    const page = this.state.page;
    fetch(`http://localhost:3000/api/products?_page=${page}&_limit=20&_sort=${this.state.filter}`)
    .then(function(response) {
      return response.json();
    })
    .then(moreProducts => {
      const test = ads(moreProducts);
      const products = [ ...this.state.products, ...test ];
      this.setState({ 
        products, 
        loadingProduct: false, 
        page: page + 1 
      });
      return moreProducts;
    })
  }
  
  loadMoreProducts = () => {
    const scrollPosition = window.pageYOffset;
    const windowSize     = window.innerHeight;
    const bodyHeight     = document.body.offsetHeight;
    const result = Math.max(bodyHeight - (scrollPosition + windowSize), 0)

    if( result === 0 ) {
      this.setState({ loadingProduct: true });
      setTimeout((() => {
        this.fetchMoreProducts();
      }))
    }
  }

  renderProducts = () => {
    console.log(this.state.products)
    return (
      !this.state.isLoading ?
        <div>
          <Products products={this.state.products} />
        </div>
      : 
        <h1>Loading...</h1>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Products</h1>
          <Filter addFilter={this.addFilter}/>
        </div>
        <div>
          {this.renderProducts()}
          {this.state.loadingProduct ? <p>Loading...</p> : ''}
        </div>
      </div>
    );
  }
}

export default App;
