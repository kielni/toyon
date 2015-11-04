import React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Sun from './Sun.jsx';
import Water from './Water.jsx';
import Size from './Size.jsx';
import SizeBucket from './SizeBucket.jsx';
import PlantType from './PlantType.jsx';
import PlantImage from './PlantImage.jsx';

export default React.createClass({
    render() {
        var plant = this.props.plant;
        var size = plant.height && plant.spread ? <Size height={plant.height} spread={plant.spread} /> : '';
        var sizeBucket = plant.height && plant.height.bucket ? <SizeBucket bucket={plant.height.bucket} /> : '';
        var bySrc = {
            flickr: plant.photos && plant.photos.flickr && plant.photos.flickr.length,
            missouriBotanical: plant.photos && plant.photos.missouriBotanical && plant.photos.missouriBotanical.length
        };
        var imgSrc;
        if (bySrc.flickr || bySrc.missouriBotanical) {
            imgSrc = bySrc.flickr ? plant.photos.flickr[0] : plant.photos.missouriBotanical[0];
        } else {
            imgSrc = 'https://farm3.staticflickr.com/2628/3831504097_2ddabec06e_z.jpg?zz=1';
        }
        var bgUrl = 'url('+imgSrc+')';
        // TODO: if no photo, add "no photo available" overlay
        return (
            <div className="plant-list-item">
                <div className="plant" style={{background: bgUrl}}>
                    <div className="details">
                    <div className="placeholder">
                        <div className="name">
                            <div className="botanical-name">{plant.name.botanical}</div>
                            <div className="common-name">{plant.name.common}</div>
                            <div className="photo-credit">photo by <a href="#">someone</a></div>
                        </div>
                        <div className="info">
                            <PlantType type={plant.type} />
                            {size}
                            <div className="requirements">
                                <Sun sun={plant.sun.range} />
                                <Water water={plant.water.range}/>
                                {sizeBucket}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
});
