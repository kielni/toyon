import React from 'react';

export default React.createClass({
    render() {
        var sun = this.props.sun.map((sunCode) => {
            return <span key={sunCode} className="sun-{sunCode}">{sunCode}</span>
        });
        return (
            <div className="sun">
                {sun}
            </div>
        );
    }
});
