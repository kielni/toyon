import React from 'react';
import PlantListItem from './PlantListItem.jsx';
import { Grid, Row, Col } from 'react-bootstrap';

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
        // groups of 2
        var rows = items.reduce((p, cur, i) => {
            (p[i/2|0] = p[i/2|0] || []).push(cur);
            return p;
        },[]);
        var grid = rows.map((row, r) => {
            let cols = row.map((col, c) => {
                return (
                    <Col xs={12} md={6} key={c}>
                        {col}
                    </Col>
                );
            });
            return (
                <Row key={r}>
                    {cols}
                </Row>
            );
        });
        return (
            <div className="plants">
                {grid}
            </div>
        );
    }
});
