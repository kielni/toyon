import React from 'react';

export default React.createClass({
    componentDidMount() {
        $('.size.tooltipped').tooltip();
    },

    render() {
        var cls = 'tooltipped size '+this.props.bucket;
        return (
            <div className="size-req">
                <span className={cls} data-position="bottom" data-tooltip={this.props.bucket}></span>
            </div>
        );
    }
});

