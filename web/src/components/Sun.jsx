import React from 'react';

export default React.createClass({
    labels: {
        shade: 'shade',
        part: 'part sun',
        sun: 'sun'
    },

    render() {
        var sun = this.props.sun.map((sunCode) => {
            var cls = 'sun '+sunCode;
            return (
                <div className={cls} key={sunCode}></div>
            );
        });
        return (
            <div className="sun-req">
                {sun}
            </div>
        );
    }
});
