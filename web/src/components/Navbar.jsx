import React from 'react';
import Filters from './Filters.jsx';
import FilterValues from './FilterValues.jsx';
import SortDefs from './SortDefs';

export default React.createClass({

    getInitialState: function() {
        return {
            search: 'none'
        }  
    },

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

    handleSearch(event) {
        event.stopPropagation();
        this.props.onSearch(event.target.value);
        this.setState({
            searchText: event.target.value
        });
    },

    handleClickSearch(event) {
        event.stopPropagation();
        let a = $(event.target).closest('.a-search');
        this.setState({
            search: $(a).attr('data-control')
        });
    },

    handleCancelSearch() {
        this.props.onSearch('');
        this.setState({
            search: 'none',
            searchText: ''
        });
    },

    handleClearSearch() {
        this.props.onSearch('');
        this.setState({
            searchText: ''
        });
    },

    searchControl(control) {
        if (this.state.search === 'field') {
            return (
                <form>
                    <div className="input-field">
                        <input id="search" type="search" className="field" onChange={this.handleSearch} placeholder="Search plants" autoFocus value={this.state.searchText} />
                        <label htmlFor="search">
                            <i className="material-icons navbar-icon">search</i>
                        </label>
                        <i className="material-icons" onClick={this.handleCancelSearch}>close</i>
                    </div>
                </form>
            );
        } else {
            return (
                <a href="#" className="a-search" data-control={control} onClick={this.handleClickSearch}>
                    <i className="material-icons navbar-icon">search</i>
                </a>
            );
        }
    },

    searchBar() {
        return (
            <div className="nav-wrapper search-bar">
                <form>
                    <div className="input-field">
                        <i className="material-icons prefix" onClick={this.handleCancelSearch}>back</i>
                        <input id="search" type="search" onChange={this.handleSearch}  placeholder="Search plants" />
                        <i className="material-icons close" onClick={this.handleClearSearch}>close</i>
                    </div>
                </form>
            </div>
        );
    },

    leftText() {
        if (this.props.counts) {
            let label = this.props.counts.filtered === 1 ? 'plant' : 'plants';
            return (
                <a href="#" className="brand-logo left">{this.props.counts.filtered} {label}</a>
            );
        } else {
            return (
                <div>Loading plants...</div>
            );
        }
    },

    regularBar() {
        let filters = this.props.filters;
        return (
            <div className="nav-wrapper">
                <Filters filters={this.props.filters} onFilter={this.handleFilter} />
                {this.leftText()}
                <ul className="right nav-buttons">
                    <li className="hide-on-small-only">
                        {this.searchControl('field')}
                    </li>
                    <li className="hide-on-med-and-up">
                        {this.searchControl('bar')}
                    </li>
                    <li>
                        <a className="dropdown-button" href="#" data-activates="sortDropdown" data-constrainwidth="false" data-beloworigin="true">
                            <i className="material-icons right navbar-icon">sort</i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="filter-button" data-activates="filters">
                            <i className="material-icons navbar-icon">filter_list</i>
                        </a>
                    </li>
                </ul>
            </div>
        );
    },

    render() {
        let sortOptions = SortDefs.keys.map((key) => {
            return (
                <li key={key}>
                    <a href="#" onClick={this.handleSort} data-sort={key}>{SortDefs[key].label}</a>
                </li>
            );
        });
        let bar = this.state.search === 'bar' ? this.searchBar() : this.regularBar();
        return (
            <div className="navbar-fixed">
                <ul id="sortDropdown" className="dropdown-content">
                    <li key="header"><span>Sort by</span></li>
                    {sortOptions}
                </ul>
                <nav>
                    {bar}
                </nav>
            </div>
        );
    }
});
