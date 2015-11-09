import React from 'react';

export default React.createClass({
    render() {
        var url, name;
        var photo = this.props.photo;
        if (photo.src === 'flickr') {
            url = 'http://flickr.com/photos/'+photo.flickr.authorId+'/'+photo.flickr.imgId;
            name = photo.flickr.authorName;
        } else if (photo.src === 'sanMarcos') {
            url = 'http://www.smgrowers.com/';
            name = 'San Marcos Growers';
        } else if (photo.src === 'missouriBotanical') {
            url = 'http://missouribotanicalgarden.org';
            name = 'Missouri Botanical Garden'
        } else {
            return ('');
        }
        return (
            <div className="photo-credit">
                photo by <a href={url}>{name}</a>
            </div>
        );
    }
});
