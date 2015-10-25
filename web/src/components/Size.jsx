import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="size">
                <span className="height">{this.props.height.from}-{this.props.height.to}' tall</span>
                <span className="by">x</span>
                <span className="width">{this.props.spread.from}-{this.props.spread.to}'' wide</span>
            </div>
        );
    }
});

