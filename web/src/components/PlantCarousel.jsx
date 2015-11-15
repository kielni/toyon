import React from 'react';
import { Image } from 'react-bootstrap';
import PhotoCredit from './PhotoCredit.jsx';
import Slider from 'react-slick';

const missing = {
                src: 'flickr',
                url: 'https://farm3.staticflickr.com/2628/3831504097_2ddabec06e_z.jpg',
                flickr: {
                    authorId: '41572124@N06',
                    imgId: 3831504097,
                    authorName: 'Kim Ruben',
                }
            };

export default React.createClass({
    getPhotos(plant) {
        if (!plant.photos) {
            return ('');
        }
        var photos = [];
        if (plant.photos.flickr) {
            // get id from https://farm4.staticflickr.com/3196/2491235636_be1498f1b1_z.jpg
            let pattern = new RegExp(/\/(\d+)_/);
            plant.photos.flickr.forEach((photo) => {
                let authorId = '', imgId = '', authorName = '';
                if (pattern.test(photo)) {
                    imgId = pattern.exec(photo)[1];
                    let author = plant.flickr[imgId];
                    if (author) {
                        authorId = author.owner;
                        authorName = author.username;
                    }
                }
                photos.push({
                    src: 'flickr',
                    url: photo,
                    flickr: {
                        authorId: authorId,
                        imgId: imgId,
                        authorName: authorName
                    }
                });
            });
        }
        ['missouriBotanical', 'sanMarcos'].forEach((src) => {
            var srcPhotos = plant.photos[src] || [];
            srcPhotos.forEach((photo) => {
                photos.push({
                    src: src,
                    url: photo
                });
            });
        });
        return photos;
    },

    render() {
        var plant = this.props.plant;
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            lazyLoad: true
        };
        var photos = this.getPhotos(plant);
        if (!photos.length) {
            return (
                <div className="plant-slider no-photo">
                    <div className="plant-slide">
                        <img src={missing.url} className="plant-img" />
                        <div className="overlay text">
                            <div className="abs-center">No photo available</div>
                        </div>
                        <div className="overlay credit">
                            <PhotoCredit photo={missing} />
                        </div>
                    </div>
                </div>
            );
        }
        var items = photos.map((photo, i) => {
            return (
                <div className="plant-slide" key={i}>
                    <img src={photo.url} className="plant-img" />
                    <PhotoCredit photo={photo} />
                </div>
            );

        });
        if (items.length === 1) {
            return (
                <div className="plant-slider">
                    {items}
                </div>
            );
        }
        return (
            <Slider className="plant-slider" {...settings}>
                {items}
            </Slider>
        );
    }
});
