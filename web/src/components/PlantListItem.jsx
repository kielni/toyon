import React from 'react';
import PlantInfo from './PlantInfo.jsx';
import PlantCarousel from './PlantCarousel.jsx';
import { Row, Col } from 'react-bootstrap';

export default React.createClass({
    render() {
        var plant = this.props.plant;
        var id = 'plant'+plant.id;
        return (
            <Row className="plant-item" id={id}>
                <Col xs={12} md={7} className="plant-carousel">
                    <PlantCarousel plant={plant} />
                </Col>
                <Col xs={12} md={5}>
                    <PlantInfo plant={plant} />
                </Col>
            </Row>
        );
    }
});
