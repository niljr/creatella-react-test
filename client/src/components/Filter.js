import React, { Component, Fragment } from 'react';

class Filter extends Component {

    filtersRef = React.createRef();

    addFilter = event => {
        event.preventDefault();
        const filter = this.filtersRef.current.value;
        this.props.addFilter(filter);
    }

    render() {
        return (
            <Fragment>
                <select name="filters" ref={this.filtersRef} onChange={this.addFilter}>
                    <option selected disabled>Filter</option>
                    <option value="size">Size</option>
                    <option value="price">Price</option>
                    <option value="id">ID</option>
                </select>
            </Fragment>
        );
    }
}

export default Filter;