import React from 'react';
import FilterDefs from './FilterDefs';

/*
    attribute - filter field name
    values - selected values
    label - header label
    onFilter - callback for state change
*/
export default React.createClass({
    getInitialState: function() {
        let values = this.props.values || [];
        let set = {};
        FilterDefs[this.props.attribute].values.forEach((val) => {
            set[val] = values.length > 0 ? values.indexOf(val) >= 0 : true;
        });
        return set;
    },

    handleChange: function(event) {
        var state = {};
        state[event.target.value] = event.target.checked;
        this.setState(state, () => {
            let selected = Object.keys(this.state).filter((key) => {
                return this.state[key];
            });
            this.props.onFilter(this.props.attribute, selected);
        });
    },

    render() {
        let attr = this.props.attribute;
        let filter = FilterDefs[attr].values.map((val) => {
            let icon = `https://s3-us-west-1.amazonaws.com/toyon/${attr}-${val}.png`;
            let id = `${val}Checkbox`;
            let iconClasses = `${attr} ${val} checkbox-icon`;
            return (
                <div className="filter-checkbox" key={val}>
                    <input type="checkbox" value={val} id={id} onChange={this.handleChange} checked={this.state[val]} className="valign"/>
                    <label htmlFor={id} className="checkbox-label">
                        <i className={iconClasses} />
                        <span className="checkbox-text">{FilterDefs[attr].labels[val]}</span>
                    </label>
                </div>
            );
        });
        return (
            <div className="filter">
                <div className="filter-name">{this.props.label}</div>
                {filter}
            </div>
        );
    }
});
