import React from 'react';
import FilterDefs from './FilterDefs';

export default React.createClass({
    render() {
        let attr = this.props.attribute;
        return (
            <li className="filter {attr}-filter">
            {
                FilterDefs[attr].values.map((val) => {
                    let selected = this.props.selected || [];
                    let classNames = `${attr} ${val}`;
                    return !selected.length || selected.indexOf(val) >= 0 ? <span key={val} className={classNames} /> : '';
                })
            }
            </li>
        );
    }
});
