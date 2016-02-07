import React from "react";
import Filters from "./Filters.jsx";
import FilterValues from "./FilterValues.jsx";
import SortDefs from "./SortDefs";

export default React.createClass({

    getInitialState: function() {
        return {
            search: "none"
        }  
    },

    componentDidMount() {
        $(".filter-button").sideNav({
            edge: "right",
            closeOnClick: false
        });
        $(".dropdown-button").dropdown({
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
        var sort = $(event.target).data("sort");
        this.props.onSort(sort);
    },

    handleSearch(event) {
        event.stopPropagation();
        console.log("handleSearch: event=", event);
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
        let a = $(event.target).closest(".a-search");
        this.setState({
            search: $(a).attr("data-control")
        });
    },

    handleCancelSearch() {
        console.log("handleCancelSearch: search=none");
        this.props.onSearch("");
        this.setState({
            search: "none",
            searchText: ""
        });
    },

    handleClearSearch() {
        console.log("handleClearSearch: search=none");
        this.props.onSearch("");
        this.setState({
            searchText: ""
        });
        $('#search').focus();
    },

    searchControl(control) {
        if (this.state.search === "field") {
            return (
                <form>
                    <div className="input-field">
                        <input id="search" type="search" className="field" onChange={this.handleSearch} placeholder="Search plants" autoFocus={true} value={this.state.searchText} />
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
                        <input id="search" type="search" onChange={this.handleSearch} placeholder="Search plants" autoFocus={true} value={this.state.searchText} />
                        <label htmlFor="search">
                            <i className="material-icons back" onClick={this.handleCancelSearch}>arrow_back</i>
                        </label>
                        <i className="material-icons close" onClick={this.handleClearSearch}>close</i>
                    </div>
                </form>
            </div>
        );
    },

    leftText() {
        if (this.props.counts) {
            let label = this.props.counts.filtered === 1 ? "plant" : "plants";
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
                        {this.searchControl("field")}
                    </li>
                    <li className="hide-on-med-and-up">
                        {this.searchControl("bar")}
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
            console.log("sortBy="+this.props.sortBy+" key="+key);
            var active = key === this.props.sortBy ? "active" : "inactive";
            return (
                <li key={key} className={active}>
                    <a href="#" onClick={this.handleSort} data-sort={key}>{SortDefs[key].label}</a>
                </li>
            );
        });
        console.log("render state=", this.state);
        let bar = this.state.search === "bar" ? this.searchBar() : this.regularBar();
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
