import React from 'react';
import PlantType from './PlantType.jsx';
import Sun from './Sun.jsx';
import Water from './Water.jsx';
import Size from './Size.jsx';
import SizeBucket from './SizeBucket.jsx';
import { Row, Col } from 'react-bootstrap';

export default React.createClass({
    render() {
        var plant = this.props.plant;
        var size = plant.height && plant.spread ? <Size height={plant.height} spread={plant.spread} /> : '';
        var sizeBucket = plant.height && plant.height.bucket ? <SizeBucket bucket={plant.height.bucket} /> : '';
        return (
            <div className="info">
                <div className="name">
                    <div className="botanical-name">
                        {plant.name.botanical}
                    </div>
                    <div className="common-name">{plant.name.common}</div>
                </div>
                <div className="details">
                    {size}
                </div>
                <div className="details">
                    <PlantType type={plant.type} />
                </div>
                <Row className="requirements">
                    <Col xs={4}>
                        <Sun sun={plant.sun.range} />
                    </Col>
                    <Col xs={4}>
                        <Water water={plant.water.range}/>
                    </Col>
                    <Col xs={4}>
                        {sizeBucket}
                    </Col>
                </Row>
            </div>
        );
    }
});
