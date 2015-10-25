import { Image } from 'react-bootstrap';
import React from 'react';

export default React.createClass({
    render() {
        var photos = this.props.photos;
        if (!photos || !photos.flickr || (!photos.flickr.length && !photos.missouriBotanical.length)) {
            return (<span className="no-image"></span>);
        }
        // TODO: check show prop show carousel if > 1
        var url = photos.flickr && photos.flickr.length ? photos.flickr[0] : photos.missouriBotanical[0];
        return (
            <div className="plant-image"><Image src={url} responsive rounded /></div>
        );
    }
});

