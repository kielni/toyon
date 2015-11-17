import React from 'react';
import PlantListItem from './PlantListItem.jsx';
//import Infinite from 'react-infinite';

export default React.createClass({
    render() {
        if (!this.props.plants.length) {
            return (
                <div className="no-results">No matching plants.</div>
            );
        }
        var heights = [];
        var items = this.props.plants.map((plant) => {
            heights.push((!plant.photos || !plant.photos.length) ? 264 : 478);
            return <PlantListItem key={plant.id} plant={plant} />
        });
        /*
                <Infinite containerHeight={window.innerHeight} elementHeight={heights} useWindowAsScrollContainer> 
                    {items}
                </Infinite>
        */
        return (
            <div className="x-plants">
                {items}
            </div>
        );
    }
});
