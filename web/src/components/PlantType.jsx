import React from 'react';

export default React.createClass({
    labels: {
        'B': 'bulb',
        'Gr': 'grass',
        'Gc': 'groundcover',
        'P': 'perennial',
        'S': 'shrub',
        'T': 'tree',
        'V': 'vine'
    },

    render() {
        var plantType = this.props.type.split(/\s+/).map((code) => {
            var cls = 'type '+code;
            return (
                <li className={{cls}} key={code}>{this.labels[code]}</li>
            );
        });
        return (
            <ul className="plant-type">
                {plantType}
            </ul>
        );
    }
});
