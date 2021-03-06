import React from 'react';
import FilterForm from './FilterForm.jsx';

export default React.createClass({
    getInitialState: function() {
        let favoritesOnly = this.props.filters.favorite && this.props.filters.favorite.length === 1;
        return {
            favoritesOnly: favoritesOnly
        };
    },

    handleFilter(attr, values) {
        this.props.onFilter(attr, values);
    },

    handleFavoriteFilter(event){
        event.stopPropagation();
        if (event.target.checked) {
            this.props.onFilter('favorite', [1]);
        } else {
            this.props.onFilter('favorite', [0,1]);
        }
        this.setState({favoritesOnly: event.target.checked});
    },

    render() {
        let filters = this.props.filters;
        let favoriteIcon = this.state.favoritesOnly ? 'favorite' : 'favorite_border';
        let filtered = this.props.counts && this.props.counts.filtered ? this.props.counts.filtered : 0;
        return (
            <ul id="filters" className="side-nav collection">
                <li className="collection-item">
                    {filtered} {filtered === 1 ? 'plant' : 'plants'}
                </li>
                <li className="collection-item">
                    <div className="switch">
                        <label>
                            <i className="material-icons favorite-icon">favorite</i>
                            <i className="material-icons favorite-icon">favorite_border</i>
                            <input type="checkbox" onChange={this.handleFavoriteFilter} checked={this.state.favoritesOnly} />
                            <span className="lever" />
                            <i className="material-icons favorite-icon">favorite</i>
                        </label>
                    </div>
                </li>
                <li className="collection-item">
                    <FilterForm attribute="sun" label="Sun" values={filters.sun} onFilter={this.handleFilter} />
                </li>
                <li className="collection-item">
                    <FilterForm attribute="water" label="Water" values={filters.water} onFilter={this.handleFilter} />
                </li>
                <li className="collection-item">
                    <FilterForm attribute="size" label="Size" values={filters.size} onFilter={this.handleFilter} />
                </li>
                <li className="collection-item">
                    <div className="about">
                        <a href="https://github.com/kielni/toyon">
                            <i className="large material-icons about-icon">help</i>
                            <span className="about-label">About</span>
                        </a>
                    </div>
                </li>
            </ul>
        );
    }
});
