import React from 'react';
import Filters from './Filters.jsx';
import FilterValues from './FilterValues.jsx';
import SortDefs from './SortDefs';

export default React.createClass({

    componentDidMount() {
        $('.filter-button').sideNav({
            edge: 'right',
            closeOnClick: false
        });
        $('.dropdown-button').dropdown({
            hover: false,
            constrain_width: false,
            belowOrigin: true
        });
    },

    handleFilter(attr, values) {
        this.props.onFilter(attr, values);
    },

    handleSort(event) {
        event.stopPropagation();
        this.props.onSort($(event.target).data('sort'));
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
        let sortOptions = SortDefs.keys.map((key) => {
            return (
                <li key={key}>
                    <a href="#" onClick={this.handleSort} data-sort={key}>{SortDefs[key].label}</a>
                </li>
            );
        });
        return (
            <div className="navbar-fixed">
                <ul id="sortDropdown" className="dropdown-content">
                    <li key="header"><span>Sort by</span></li>
                    {sortOptions}
                </ul>
                <nav>
                    <div className="nav-wrapper">
                        <Filters filters={this.props.filters} onFilter={this.handleFilter} />
                        {left}
                        <ul className="right hide-on-small-only">
                            <FilterValues attribute="sun" selected={filters.sun} />
                            <FilterValues attribute="water" selected={filters.water} />
                            <FilterValues attribute="size" selected={filters.size} />
                            <li>
                                <a className="dropdown-button" href="#" data-activates="sortDropdown" data-constrainwidth="false" data-beloworigin="true">
                                    <i className="material-icons right">sort</i>
                                </a>
                            </li>
                            <li><a href="#"><i className="material-icons">search</i></a></li>
                            <li><a href="#" className="filter-button" data-activates="filters"><i className="icon-filter" /></a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
});
