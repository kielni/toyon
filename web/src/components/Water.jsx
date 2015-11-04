import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default React.createClass({
    labels: {
        N: 'none',
        L: 'low',
        M: 'moderate'
    },

    render() {
        var water = this.props.water.map((waterCode) => {
            var cls = 'water '+waterCode;
            var tooltip = (<Tooltip>{this.labels[waterCode]}</Tooltip>);
            return (
                <OverlayTrigger key={waterCode} placement="bottom" overlay={tooltip}>
                    <span className={cls}></span>
                </OverlayTrigger>
            );
        });
        return (
            <div className="water-req">{water}</div>
        );
    }
});

