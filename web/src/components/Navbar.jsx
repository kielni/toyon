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
            edge: 'left',
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
        var sort = $(event.target).data('sort');
        this.props.onSort(sort);
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
        /*
        Touching the search icon causes the toolbar to transform, clearing other content and displaying a search text field. The search text field automatically receives focus.

        Touching the up arrow closes search and restores the original presentation of the toolbar.
        The X action in the search field clears the query.
        */
        let a = $(event.target).closest('.a-search');
        this.setState({
            search: $(a).attr('data-control')
        });
    },

    handleClickSearchResult(event) {
        event.stopPropagation();
        let text = $(event.target).closest('.name').find('.botanical-name').text();
        this.props.onSearch(text);
        this.setState({
            search: 'none',
            searchText: text
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
        $('#search').focus();
    },

    searchControl(control) {
        if (this.state.search === 'field') {
            return (
                <form>
                    <div className="input-field">
                        <input id="search" type="search" className="field" onChange={this.handleSearch} placeholder="Search plants" autoFocus={true} value={this.state.searchText} />
                        <label htmlFor="search">
                            <i className="material-icons navbar-icon">search</i>
                        </label>
                        <i className="material-icons" onClick={this.handleCancelSearch}>close</i>
                    </div>
                    {this.searchResults()}
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
                        <input id="search" type="search" onChange={this.handleSearch} placeholder="Search plants" autoFocus={true} value={this.state.searchText} />
                        <label htmlFor="search">
                            <i className="material-icons back" onClick={this.handleCancelSearch}>arrow_back</i>
                        </label>
                        <i className="material-icons close" onClick={this.handleClearSearch}>close</i>
                    </div>
                    {this.searchResults()}
                </form>
            </div>
        );
    },

    searchResults() {
        if (!this.props.plants || !this.state.searchText) {
            return '';
        }
        // sort by common name if set, else botanical name
        let sortBy = this.state.sortBy === 'botanical' ? 'botanical' : 'common';
        let plants = this.props.plants.sort((a, b) => {
            if (a.name[sortBy] === b.name[sortBy]) {
                return 0;
            }
            return a.name[sortBy] < b.name[sortBy] ? -1 : 1;
        });
        // non-empty search with results
        let results = plants.map((plant) => {
            return (
                <div key={plant.id} className="name" onClick={this.handleClickSearchResult}>
                    <span className="botanical-name">{plant.name.botanical} </span>
                    <span className="common-name">{plant.name.common}</span>
                </div>
            );
        });
        return (
            <div className="search-results">
                {results}
            </div>
        );
    },

    leftText() {
        if (this.props.counts) {
            let label = '';
            if (this.state.searchText && this.props.counts.filtered === 1) {
                label = this.state.searchText;
            } else {
                if (this.props.counts.filtered === this.props.counts.total) {
                    label = 'All plants';
                } else {
                    label = this.props.counts.filtered+' ';
                    label += this.props.counts.total === 1 ? 'plant' : 'plants';
                }
            }
            return (
                <a href="#" className="brand-logo left">
                    {label}
                </a>
            );
        } else {
            return (
                <div>Loading plants...</div>
            );
        }
    },

    regularBar() {
        let filters = this.props.filters;
        let leftButtons = [], rightButtons = [];
        rightButtons.push(
            <li key="search-field" className="hide-on-small-only">
                {this.searchControl("field")}
            </li>
        );
        rightButtons.push(
            <li key="search-bar" className="hide-on-med-and-up">
                {this.searchControl("bar")}
            </li>
        );
        if (this.state.search === 'none') {
            rightButtons.push(
                <li key="sort">
                    <a className="dropdown-button" href="#" data-activates="sortDropdown" data-constrainwidth="false" data-beloworigin="true">
                        <i className="material-icons right navbar-icon">sort</i>
                    </a>
                </li>
            );
            leftButtons.push(
                <li key="filter">
                    <a href="#" className="filter-button" data-activates="filters">
                        <i className="material-icons navbar-icon">menu</i>
                    </a>
                </li>
            );
        }
        return (
            <div className="nav-wrapper">
                <Filters filters={this.props.filters} onFilter={this.handleFilter} />
                {this.leftText()}
                <ul className="left nav-buttons">
                    {leftButtons}
                </ul>
                <ul className="right nav-buttons">
                    {rightButtons}
                </ul>
            </div>
        );
    },

    render() {
        let sortOptions = SortDefs.keys.map((key) => {
            var active = key === this.props.sortBy ? 'active' : 'inactive';
            return (
                <li key={key} className={active}>
                    <a href="#" onClick={this.handleSort} data-sort={key}>{SortDefs[key].label}</a>
                </li>
            );
        });
        let bar = this.state.search === 'bar' ? this.searchBar() : this.regularBar();
        return (
            <div className="navbar-fixed">
                <nav>
                    <ul id="sortDropdown" className="dropdown-content">
                        <li key="header"><span>Sort by</span></li>
                        {sortOptions}
                    </ul>
                    {bar}
                </nav>
            </div>
        );
    }
});
