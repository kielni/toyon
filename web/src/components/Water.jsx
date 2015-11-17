import React from 'react';

export default React.createClass({
    labels: {
        N: 'none',
        L: 'low',
        M: 'moderate'
    },

    render() {
        var water = this.props.water.map((waterCode) => {
            var cls = 'water '+waterCode;
            return (
                <span className={cls} key={waterCode}></span>
            );
        });
        return (
            <div className="water-req">{water}</div>
        );
    }
});

