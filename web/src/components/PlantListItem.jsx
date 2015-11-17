import React from 'react';
import PlantInfo from './PlantInfo.jsx';
import PlantCarousel from './PlantCarousel.jsx';
import { Row, Col } from 'react-bootstrap';

export default React.createClass({
    render() {
        var plant = this.props.plant;
        var id = 'plant'+plant.id;
        return (
            <div className="row plant-item">
                <div className="col s12 m7">
                    <div className="card">
                        <div className="x-card-image plant-carousel">
                            <PlantCarousel plant={plant} />
                        </div>
                        <div className="card-content">
                            <PlantInfo plant={plant} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
