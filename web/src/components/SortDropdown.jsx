import React from 'react';
import SortDefs from './SortDefs';

export default React.createClass({
    componentDidMount() {
        $('.dropdown-button').dropdown({
            hover: false,
            constrain_width: false,
            belowOrigin: true
        });
    },

    handleSort(event) {
        event.stopPropagation();
        var sort = $(event.target).data('sort');
        this.props.onSort(sort);
    },

    render() {
        let sortOptions = SortDefs.keys.map((key) => {
            var active = key === this.props.sortBy ? 'active' : 'inactive';
            return (
                <li key={key} className={active}>
                    <a href="#" onClick={this.handleSort} data-sort={key}>{SortDefs[key].label}</a>
                </li>
            );
        });
        return (
            <div id="sortDropdownWrapper">
                <a className="dropdown-button" href="#" data-activates="sortDropdown" data-constrainwidth="false" data-beloworigin="true">
                    <i className="material-icons right navbar-icon">sort</i>
                </a>
                <ul key="sort-dropdown" id="sortDropdown" className="dropdown-content">
                    <li key="header"><span>Sort by</span></li>
                    {sortOptions}
                </ul>
            </div>
        );
    }
});
