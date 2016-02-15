import React from 'react';
import FilterDropdown from './FilterDropdown.jsx';
import SortDropdown from './SortDropdown.jsx';

export default React.createClass({

    getInitialState: function() {
        return {
            search: 'none'
        }  
    },

    handleFilter(attr, values) {
        this.props.onFilter(attr, values);
    },

    handleSort(sort) {
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

    cancelSearchIcon() {
        return (<i className="material-icons back" onClick={this.handleCancelSearch}>arrow_back</i>);
    },

    searchIcon() {
        return (<i className="material-icons navbar-icon">search</i>);
    },

    searchControl(control) {
        if (this.state.search === 'field') {
            let leftIcon = this.state.searchText ? this.cancelSearchIcon() : this.searchIcon();
            return (
                <form>
                    <div className="input-field">
                        <input id="search" type="search" className="field" onChange={this.handleSearch} placeholder="Search plants" autoFocus={true} value={this.state.searchText} />
                        <label htmlFor="search">
                            {leftIcon}
                        </label>
                        <i className="material-icons" onClick={this.handleCancelSearch}>close</i>
                    </div>
                    {this.searchResults()}
                </form>
            );
        } else {
            return (
                <a href="#" className="a-search" data-control={control} onClick={this.handleClickSearch}>
                    {this.searchIcon()}
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
                            {this.cancelSearchIcon()}
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

    title() {
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
                    <SortDropdown onSort={this.handleSort} />
                </li>
            );
            leftButtons.push(
                <li key="filter">
                    <FilterDropdown counts={this.props.counts} filters={this.props.filters} onFilter={this.handleFilter} />
                </li>
            );
        }
        return (
            <div className="nav-wrapper">
                {this.title()}
                <ul key="left-nav-buttons " className="left nav-buttons">
                    {leftButtons}
                </ul>
                <ul key="right-nav-buttons" className="right nav-buttons">
                    {rightButtons}
                </ul>
            </div>
        );
    },

    render() {
        return (
            <div className="navbar-fixed">
                <nav>
                    {this.state.search === 'bar' ? this.searchBar() : this.regularBar()}
                </nav>
            </div>
        );
    }
});
