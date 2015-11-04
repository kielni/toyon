import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default React.createClass({
    labels: {
        low: '< 1ft',
        small: '1-3 ft',
        medium: '3-8 ft',
        large: '8+ ft'
    },

    render() {
        var cls = 'size '+this.props.height.bucket;
        var tooltip = (<Tooltip>{this.labels[this.props.height.bucket]}</Tooltip>);
        return (
            <div className="size-req">
                <OverlayTrigger placement="bottom" overlay={tooltip}>
                    <span className={cls}></span>
                </OverlayTrigger>
                <span className="height">{this.props.height.from}-{this.props.height.to}' tall</span>
                <span className="by">x</span>
                <span className="width">{this.props.spread.from}-{this.props.spread.to}' wide</span>
            </div>
        );
    }
});

