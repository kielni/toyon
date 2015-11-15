import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default React.createClass({
    render() {
        var cls = 'size '+this.props.bucket;
        var tooltip = (<Tooltip id={this.props.bucket}>{this.props.bucket}</Tooltip>);
        return (
            <div className="size-req">
                <OverlayTrigger key={this.props.bucket} placement="bottom" overlay={tooltip}>
                    <span className={cls}></span>
                </OverlayTrigger>
            </div>
        );
    }
});

