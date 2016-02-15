import React from 'react';
import Filters from './Filters.jsx';

export default React.createClass({
    componentDidMount() {
        $('.filter-button').sideNav({
            edge: 'left',
            closeOnClick: false
        });
    },

    handleFilter(attr, values) {
        this.props.onFilter(attr, values);
    },

    render() {
        return (
            <div id="filterDropdownWrapper">
                <a href="#" className="filter-button" data-activates="filters">
                    <i className="material-icons navbar-icon">menu</i>
                </a>
                <Filters filters={this.props.filters} onFilter={this.handleFilter} counts={this.props.counts}/>
            </div>
        );
    }
});
