import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PlantListItem from './PlantListItem.jsx';

export default React.createClass({
    render() {
        if (!this.props.plants.length) {
            return (
                <div className="no-results">No matching plants.</div>
            );
        }
        var items = this.props.plants.map((plant) => {
            return <PlantListItem key={plant.id} plant={plant} />
        });
        return (
            <ListGroup>
                {items}
            </ListGroup>
        );
    }
});
