import React from 'react';

export default React.createClass({
    sources: {
        sanMarcos: {
            prefix: 'http://www.smgrowers.com/products/plants/plantdisplay.asp?plant_id=',
            label: 'San Marcos',
            icon: 'http://www.smgrowers.com/favicon.ico'
        },
        missouriBotanical: {
            prefix: 'http://www.missouribotanicalgarden.org/PlantFinder/PlantFinderDetails.aspx?taxonid=',
            label: 'Missouri Botanical Garden',
            icon: 'http://www.missouribotanicalgarden.org/favicon.ico'
        }
    },

    render() {
        var search = this.props.search;
        var links = [];
        Object.keys(this.sources).forEach((src) => {
            if (search[src] && search[src].matches && search[src].matches.length) {
                let matches = search[src].matches.map((match, idx) => {
                    let url = this.sources[src].prefix + match.id;
                    return (
                        <li key={idx}><a href={url}>{match.name}</a></li>
                    );
                });
                let cssId = src+'Links';
                links.push(
                    <div className="more-list" key={src}>
                        <span className="source" id={cssId} />
                        <ul>
                            {matches}
                        </ul>
                    </div>
                );
            }
        });
        if (!links.length) {
            return '';
        }
        return (
            <div className="more-info">
                {links}
            </div>
        );
    }
});
