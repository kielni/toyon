import React from 'react';
import PlantType from './PlantType.jsx';
import Sun from './Sun.jsx';
import Water from './Water.jsx';
import Size from './Size.jsx';
import SizeBucket from './SizeBucket.jsx';
import PlantGroup from './PlantGroup.jsx';
import MoreInfo from './MoreInfo.jsx';
import { Row, Col } from 'react-bootstrap';

export default React.createClass({
    render() {
        var plant = this.props.plant;
        var size = plant.height && plant.spread ? <Size height={plant.height} spread={plant.spread} /> : '';
        var sizeBucket = plant.height && plant.height.bucket ? <SizeBucket bucket={plant.height.bucket} /> : '';
        var moreInfo = plant.search && Object.keys(plant.search).length > 0 ? <MoreInfo search={plant.search} /> : '';
        var group = plant.group ? <PlantGroup group={plant.group} /> : '';
        return (
            <div className="info">
                <Row className="name">
                    <Col xs={6}>
                        <div className="botanical-name">
                            {plant.name.botanical}
                        </div>
                        <div className="common-name">
                            {plant.name.common}
                        </div>
                    </Col>
                    <Col xs={6}>
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
                    </Col>
                </Row>
                <div className="details">
                    <PlantType type={plant.type} />
                    {group}
                    {size}
                </div>
                {moreInfo}
            </div>
        );
    }
});
