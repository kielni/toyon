import React from 'react';
import Filters from './Filters.jsx';
import FilterValues from './FilterValues.jsx';

export default React.createClass({

    componentDidMount() {
        $('.filter-button').sideNav({
            edge: 'right',
            closeOnClick: false
        });
    },

    handleFilter(attr, values) {
        this.props.onFilter(attr, values);
    },

    render() {
        var left;
        if (this.props.counts) {
            left = <a href="#" className="brand-logo left">{this.props.counts.filtered} plants</a>;
        } else {
            left = (
                <div>Loading plants...</div>
            );
        }
        let filters = this.props.filters;
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <Filters filters={this.props.filters} onFilter={this.handleFilter} />
                        {left}
                        <ul className="right hide-on-small-only">
                            <FilterValues attribute="sun" selected={filters.sun} />
                            <FilterValues attribute="water" selected={filters.water} />
                            <FilterValues attribute="size" selected={filters.size} />
                            <li><a href="#"><i className="material-icons">search</i></a></li>
                            <li><a href="#" className="filter-button" data-activates="filters"><i className="icon-filter" /></a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
});
