import React from 'react';

export default React.createClass({
    labels: {
        N: 'none',
        L: 'low',
        M: 'moderate'
    },

    componentDidMount() {
        $('.water.tooltipped').tooltip();
    },

    render() {
        var water = this.props.water.map((waterCode) => {
            var cls = 'tooltipped water '+waterCode;
            var label = this.labels[waterCode]+' water';
            return (
                <span className={cls} data-position="bottom" data-tooltip={label} key={waterCode}></span>
            );
        });
        return (
            <div className="water-req">{water}</div>
        );
    }
});

