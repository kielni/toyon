import React from 'react';
import PlantInfo from './PlantInfo.jsx';
import PlantCarousel from './PlantCarousel.jsx';

export default React.createClass({
    handleFavorite(plantId, isFavorite) {
        this.props.onFavorite(plantId, isFavorite);
    },

    render() {
        var plant = this.props.plant;
        var id = 'plant'+plant.id;
        return (
            <div className="row plant-item">
                <div className="col s12 m8 offset-m2">
                    <div className="card">
                        <div className="x-card-image plant-carousel">
                            <PlantCarousel plant={plant} />
                        </div>
                        <div className="card-content">
                            <PlantInfo plant={plant} onFavorite={this.handleFavorite} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
