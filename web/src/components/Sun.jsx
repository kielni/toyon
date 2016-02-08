import React from 'react';

export default React.createClass({
    labels: {
        shade: 'shade',
        part: 'part sun',
        sun: 'sun'
    },

    componentDidMount() {
        $('.sun.tooltipped').tooltip();
    },

    render() {
        var sun = this.props.sun.map((sunCode) => {
            var cls = 'tooltipped sun '+sunCode;
            return (
                <div className={cls} data-position="bottom" data-tooltip={this.labels[sunCode]} key={sunCode}></div>
            );
        });
        return (
            <div className="sun-req">
                {sun}
            </div>
        );
    }
});
