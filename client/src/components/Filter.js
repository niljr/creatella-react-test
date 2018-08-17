import React from 'react';

class Filter extends React.Component {

    filtersRef = React.createRef();

    addFilter = event => {
        event.preventDefault();
        const filter = this.filtersRef.current.value;
        this.props.addFilter(filter);
    }

    render() {
        return (
            <React.Fragment>
                <select name="filters" ref={this.filtersRef} onChange={this.addFilter}>
                    <option selected disabled>Filter</option>
                    <option value="size">Size</option>
                    <option value="price">Price</option>
                    <option value="id">ID</option>
                </select>
            </React.Fragment>
        );
    }
}

export default Filter;