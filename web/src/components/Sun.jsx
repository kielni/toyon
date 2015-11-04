import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default React.createClass({
    labels: {
        shade: 'shade',
        part: 'part sun',
        sun: 'sun'
    },

    render() {
        var sun = this.props.sun.map((sunCode) => {
            var cls = 'sun '+sunCode;
            var tooltip = (<Tooltip>{this.labels[sunCode]}</Tooltip>);
            return (
                <OverlayTrigger key={sunCode} placement="bottom" overlay={tooltip}>
                    <div className={cls}></div>
                </OverlayTrigger>
            );
        });
        return (
            <div className="sun-req">
                {sun}
            </div>
        );
    }
});
