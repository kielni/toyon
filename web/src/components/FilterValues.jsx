import React from 'react';
import FilterDefs from './FilterDefs';

export default React.createClass({
    render() {
        let attr = this.props.attribute;
        let liClasses = attr+"-filter filter hide-on-small-only ";
        return (
            <li className={liClasses}>
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
