import React from 'react';

export default React.createClass({
    render() {
        var water = this.props.water.map((waterCode) => {
            return <span key={waterCode} className="water-{waterCode}">{waterCode}</span>
        });
        return (
            <div>{water}</div>
        );
    }
});

