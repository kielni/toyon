import React from 'react';
import PlantType from './PlantType.jsx';
import Sun from './Sun.jsx';
import Water from './Water.jsx';
import Size from './Size.jsx';
import SizeBucket from './SizeBucket.jsx';
import PlantGroup from './PlantGroup.jsx';
import MoreInfo from './MoreInfo.jsx';

export default React.createClass({
    render() {
        var plant = this.props.plant;
        var size = plant.height && plant.spread ? <Size height={plant.height} spread={plant.spread} /> : '';
        var sizeBucket = plant.height && plant.height.bucket ? <SizeBucket bucket={plant.height.bucket} /> : '';
        var moreInfo = plant.search && Object.keys(plant.search).length > 0 ? <MoreInfo search={plant.search} /> : '';
        var group = plant.group ? <PlantGroup group={plant.group} /> : '';
        return (
            <div className="info">
                <div className="row name">
                    <div className="col s6">
                        <div className="botanical-name">
                            {plant.name.botanical}
                        </div>
                        <div className="common-name">
                            {plant.name.common}
                        </div>
                    </div>
                    <div className="col s6">
                        <div className="row requirements">
                            <div className="col s4 sun-col">
                                <Sun sun={plant.sun.range} />
                            </div>
                            <div className="col s4">
                                <Water water={plant.water.range}/>
                            </div>
                            <div className="col s4">
                                {sizeBucket}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row details">
                    <div className="col s6">
                        <PlantType type={plant.type} />
                        {group}
                    </div>
                    <div className="col s6">
                        {size}
                    </div>
                </div>
                <div className="row details">
                    <div className="col s12">
                        {moreInfo}
                    </div>
                </div>
            </div>
        );
    }
});
