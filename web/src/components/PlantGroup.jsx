import React from 'react';

const labels = {
    'Ba': 'bamboo',
    'Pm': 'palm/cycad',
    'Su': 'succulent',
};

export default React.createClass({
    render() {
        return (
            <div className="plant-group">
                {labels[this.props.group]}
            </div>
        );
    }
});
