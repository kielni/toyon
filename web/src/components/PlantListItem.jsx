import React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Sun from './Sun.jsx';
import Water from './Water.jsx';
import Size from './Size.jsx';
import PlantImage from './PlantImage.jsx';

export default React.createClass({
    render() {
        var plant = this.props.plant;
        var img = plant.photos ? <PlantImage photos={plant.photos} show={1} /> : '';
        var size = plant.height && plant.spread ? <Size height={plant.height} spread={plant.spread} /> : '';
        return (
            <ListGroupItem key={plant.id} className="plant-list-item">
                <Row className="showGrid">
                    <Col sm={8}>
                        <div className="name">
                            <span className="botanical-name">{plant.name.botanical}</span> - 
                            <span className="common-name">{plant.name.common}</span>
                        </div>
                        <Row className="requirements">
                            <Col sm={4}>
                                <Sun sun={plant.sun.range} />
                            </Col>
                            <Col sm={4}>
                                <Water water={plant.water.range} />
                            </Col>
                            <Col sm={4}>
                                {size}
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={4}>{img}</Col>
                </Row>
            </ListGroupItem>
        );
    }
});
