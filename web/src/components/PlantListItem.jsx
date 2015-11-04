import React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Sun from './Sun.jsx';
import Water from './Water.jsx';
import Size from './Size.jsx';
import PlantImage from './PlantImage.jsx';

export default React.createClass({
    render() {
        var plant = this.props.plant;
        var size = plant.height && plant.spread ? <Size height={plant.height} spread={plant.spread} /> : '';
        return (
            <ListGroupItem key={plant.id} className="plant-list-item">
                <Row className="showGrid">
                    <Col sm={9}>
                        <Row>
                            <Col sm={8}>
                                <div className="name">
                                    <div className="botanical-name">{plant.name.botanical}</div>
                                    <div className="common-name">{plant.name.common}</div>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <Sun sun={plant.sun.range} />
                                <Water water={plant.water.range}/>
                                {size}
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={3}><PlantImage photos={plant.photos} show={1} /></Col>
                </Row>
            </ListGroupItem>
        );
    }
});
