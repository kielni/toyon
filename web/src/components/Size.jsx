import React from 'react';

export default React.createClass({
    render() {
        var height = this.props.height;
        var heightRange = height.from === height.to ? height.from : height.from+"-"+height.to;
        var spread = this.props.spread;
        var spreadRange = spread.from === spread.to ? spread.from : spread.from+"-"+spread.to;
        return (
            <div className="size-range">
                <span className="height">{heightRange}' tall</span>
                <span className="by">x</span>
                <span className="width">{spreadRange}' wide</span>
            </div>
        );
    }
});

