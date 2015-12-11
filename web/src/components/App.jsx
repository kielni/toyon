import React from 'react';
import { Link }  from 'react-router';
import PlantList from './PlantList.jsx';
import Navbar from './Navbar.jsx';
import Request from 'superagent';
import FilterDefs from './FilterDefs';
import SortDefs from './SortDefs';

const pageSize = 3;

export default React.createClass({
    getInitialState: function() {
        let filters = localStorage.getItem('filters');
        if (filters) {
            filters = JSON.parse(filters).filters;
        } else {
            filters = {
                sun: FilterDefs.sun.values,
                water: FilterDefs.water.values,
                size: FilterDefs.size.values,
                favorite: [0, 1]
            };
        }
        return {
            plants: [],
            filteredPlants: [],
            filters: filters,
            sortBy: localStorage.getItem('sortBy') || 'botanical',
            favorites: this.getFavorites(),
            loaded: false,
        };
    },

    getFavorites() {
        let favorites = localStorage.getItem('favorites');
        if (favorites) {
            favorites = JSON.parse(favorites).favorites;
        } else {
            favorites = [];
        }
        return favorites;
    },

    showMore: function() {
        this.setState({
            to: Math.min(this.state.filteredPlants.length-1, this.state.to+pageSize)
        });
    },

    componentDidMount() {
        var self = this;
        Request.get('https://s3-us-west-1.amazonaws.com/toyon/toyon_pruned.json.gz')
        //Request.get('local/toyon_pruned.json')
            .end(function(err, res) {
                let favorites = self.state.favorites || [];
                let plants = res.body.plants;
                plants.forEach((plant) => {
                    plant.favorite = favorites.indexOf(plant.id) >= 0 ? 1 : 0;
                });
                self.setState({
                    plants: plants,
                    to: pageSize,
                    loaded: true
                }, () => {
                    self.setState({filteredPlants: self.filterPlants()});
                });
        });
        Materialize.scrollFire([
            { selector: '#moreMarker', offset: 0, callback: this.showMore, repeat: true }
        ]);
    },

    handleFilter(field, values) {
        let filters = {};
        Object.keys(this.state.filters).forEach((key) => {
            filters[key] = this.state.filters[key];
        });
        filters[field] = values;
        localStorage.setItem('filters', JSON.stringify({filters: filters}));
        this.setState({filters: filters}, () => {
            this.setState({filteredPlants: this.filterPlants()});
        });
    },

    handleFavorite(plantId, isFavorite) {
        let favorites = this.getFavorites();
        let plants = this.state.plants;
        let plant = plants.find((plant) => {
            return plant.id === plantId;
        });
        plant.favorite = isFavorite ? 1 : 0;
        this.setState({plants: plants});
        if (isFavorite) {
            favorites.push(plantId);
        } else {
            let idx = favorites.indexOf(plantId);
            if (idx >= 0) {
                favorites.splice(idx, 1);
            }
        }
        localStorage.setItem('favorites', JSON.stringify({favorites: favorites}));
    },

    getAttribute(plant, attr) {
        if (attr === 'sun' || attr === 'water') {
            return plant[attr].range;
        }
        if (attr === 'size') {
            // return an array for consistency
            return [plant.height.bucket];
        }
        if (attr === 'favorite') {
            return [plant.favorite];
        }
    },

    filterAttribute(attr, plants) {
        let values = this.state.filters[attr];
        console.log('filterAttribute: attr='+attr+' values=', values);
        // no filters to apply
        if (!values || values.length === 0 || values.length === FilterDefs[attr].values.length) {
            return plants;
        }
        return plants.filter((plant) => {
            let plantValue = this.getAttribute(plant, attr);
            return values.find((val) => {
                return plantValue.indexOf(val) >= 0;
            });
        });
    },

    filterPlants() {
        let results = this.state.plants;
        ['favorite', 'sun', 'water', 'size'].forEach((attr) => {
            results = this.filterAttribute(attr, results);
        });
        console.log('done filter '+results.length);
        return results.sort(SortDefs[this.state.sortBy].compare);
    },

    handleSort(sortBy) {
        localStorage.setItem('sortBy', sortBy);
        this.setState({sortBy: sortBy}, () => {
            this.setState({filteredPlants: this.state.filteredPlants.sort(SortDefs[sortBy].compare)});
        });
    },

    handleSearch(search) {
        search = search.toLowerCase();
        let plants = this.filterPlants().filter((plant) => {
            return plant.name.botanical.toLowerCase().indexOf(search) >= 0 ||
                plant.name.common.toLowerCase().indexOf(search) >= 0;
        });
        this.setState({filteredPlants: plants});
    },

    render() {
        if (!this.state.loaded) {
            return (
                <div className="loading">
                    <Navbar filters={this.state.filters} onSort={this.handleSort} onSearch={this.handleSearch} />
                    <div className="progress">
                      <div className="indeterminate"></div>
                    </div>
                </div>
            );
        }
        let filtered = this.state.filteredPlants;
        let counts = {
            filtered: filtered.length,
            total: this.state.plants.length
        };
        return (
            <div className="toyon">
                <Navbar filters={this.state.filters} counts={counts} onFilter={this.handleFilter} onSort={this.handleSort} onSearch={this.handleSearch} />
                <PlantList plants={filtered.slice(0, this.state.to)} onFavorite={this.handleFavorite}/>
                {
                    (this.state.to < filtered.length) ?
                        <div id="moreMarker" className="chip">More...</div>
                    : ''
                }
            </div>
        );
    }
});
