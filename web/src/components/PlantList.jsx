import React from 'react';
import PlantListItem from './PlantListItem.jsx';

export default React.createClass({
    handleFavorite(plantId, isFavorite) {
        this.props.onFavorite(plantId, isFavorite);
    },

    render() {
        if (!this.props.plants.length) {
            return (
                <div className="no-results">No matching plants.</div>
            );
        }
        var heights = [];
        var items = this.props.plants.map((plant) => {
            heights.push((!plant.photos || !plant.photos.length) ? 264 : 478);
            return <PlantListItem key={plant.id} plant={plant} onFavorite={this.handleFavorite}/>
        });
        return (
            <div className="plant-list">
                {items}
            </div>
        );
    }
});
