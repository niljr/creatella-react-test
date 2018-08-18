import React, { Component, Fragment } from 'react';

import Filter from './components/Filter';
import Products from './components/Products';
import { ads, fetchProducts } from './helpers';
import './App.css';

class App extends Component {

  state = {
    products: {},
    filter: '',
    isLoading: true,
    loadingProduct: false,
    page: 1,
    reachedTheEnd: false,
  }

  async componentDidMount() {
    window.addEventListener("scroll", this.loadMoreProducts);

    this.getProducts();

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)

  }

  addFilter = async filter => {
    try {
      this.setState({ isLoading: true })
      const res = await fetchProducts(this.state.page, filter)
      const adsResult = ads(res);

      this.setState({
        products: adsResult,
        isLoading: false,
        filter,
        page: this.state.page + 1
      })

    } catch(err) {
      console.error(err);
    }
    
  }

  getProducts = async () => {
    try {
      let result = [];
      const productsFromFetch = await fetchProducts(this.state.page, this.state.filter);
      const productsWithAds = ads(productsFromFetch); 
      
      
      if (this.state.products.length > 0) {
        result = [...this.state.products, ...productsWithAds];
      } else {
        result = [...productsWithAds]
      }

      if (productsFromFetch.length === 0) {
        this.setState({ reachedTheEnd: true })
        return;
      }

      this.setState({ 
        products: result, 
        isLoading: false, 
        page: this.state.page + 1 });

    }catch(err) {
      console.error(err)
    }

  }
  
  loadMoreProducts = () => {
    const scrollPosition = window.pageYOffset;
    const windowSize     = window.innerHeight;
    const bodyHeight     = document.body.offsetHeight;

    const result = Math.max(bodyHeight - (scrollPosition + windowSize), 0)

    if (result === 0) {
      this.setState({ loadingProduct: true });
      this.getProducts();
    }
  }

  renderProducts = () => {
    console.log(this.state.reachedTheEnd)
    return (
      !this.state.isLoading ?
        <div>
          <Products products={this.state.products} reachedTheEnd />
        </div>
      : 
        <div className='loader'></div>
    );
    
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Products</h1>
          <Filter addFilter={this.addFilter} reachedTheEnd={this.state.reachedTheEnd} />
        </div>

        <Fragment>
          {this.renderProducts()}
          {this.state.loadingProduct && !this.state.reachedTheEnd ? <div className='loader'></div> : null}
          {this.state.reachedTheEnd ? <h1 className='end-catalogue'>~ end of catalogue ~</h1> : null}
        </Fragment>

      </div>
    );
  }
}

export default App;
