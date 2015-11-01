import { Image } from 'react-bootstrap';
import React from 'react';

export default React.createClass({
    render() {
        var photos = this.props.photos;
        // if photos.flickr or photos.missouriBotanical
        var bySrc = {
            flickr: photos && photos.flickr && photos.flickr.length,
            missouriBotanical: photos && photos.missouriBotanical && photos.missouriBotanical.length
        };
        if (bySrc.flickr || bySrc.missouriBotanical) {
            var url = bySrc.flickr ? photos.flickr[0] : photos.missouriBotanical[0];
            return (
                <div className="plant-image"><Image src={url} responsive rounded /></div>
            );
        }
        // TODO: check show prop show carousel if > 1
        return (<span className="no-image"></span>);
    }
});

