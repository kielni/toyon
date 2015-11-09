import React from 'react';
import PlantInfo from './PlantInfo.jsx';
import PlantCarousel from './PlantCarousel.jsx';

export default React.createClass({
    render() {
        var plant = this.props.plant;
        var id = 'plant'+plant.id;
        return (
            <div className="plant-item" id={id}>
                <PlantCarousel plant={plant} />
                <PlantInfo plant={plant} />
            </div>
        );
    }
});
