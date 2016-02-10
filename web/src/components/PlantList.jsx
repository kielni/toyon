import React from 'react';
import PlantListItem from './PlantListItem.jsx';

export default React.createClass({
    handleFavorite(plantId, isFavorite) {
        this.props.onFavorite(plantId, isFavorite);
    },

    render() {
        if (!this.props.plants.length) {
            return (
                <div className="no-search-results valign-wrapper">
                    <div className="valign text">
                        Never heard of a plant like that.
                        <img src="/img/blue-rose.png" />
                    </div>
                </div>
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
