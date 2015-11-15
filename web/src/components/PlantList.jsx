import React from 'react';
import PlantListItem from './PlantListItem.jsx';
import { Grid } from 'react-bootstrap';

export default React.createClass({
    chunk(arr, n) {
        return arr.reduce(function(p, cur, i) {
            (p[i/n|0] = p[i/n|0] || []).push(cur);
            return p;
        },[]);
    },

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
            <Grid className="plants" fluid={true}>
                {items}
            </Grid>
        );
    }
});
