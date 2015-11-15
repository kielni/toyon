import React from 'react';

export default React.createClass({
    getText(field) {
        let info = {label: 'feet'};
        if (field.from === field.to) {
            info.range = field.from;
            if (field.from === 1) {
                info.label = 'foot';
            }
        } else {
            info.range = field.from+"-"+field.to;
        }
        return info;
    },

    render() {
        var height = this.getText(this.props.height);
        var spread = this.getText(this.props.spread);
        return (
            <div className="size-range">
                <span className="height">{height.range} {height.label} tall</span>
                <span className="by">x</span>
                <span className="width">{spread.range} {spread.label} wide</span>
            </div>
        );
    }
});

