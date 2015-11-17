import React from 'react';

export default React.createClass({
    render() {
        var cls = 'size '+this.props.bucket;
        return (
            <div className="size-req">
                <span className={cls}></span>
            </div>
        );
    }
});

