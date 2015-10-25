import React from 'react';
import { Link }  from 'react-router';
import { Navbar, NavBrand, Nav, NavItem } from 'react-bootstrap';
import PlantList from './PlantList.jsx';

export default React.createClass({
    mixins: [ReactFireMixin],

    componentWillMount: function() {
        var ref = new Firebase('https://toyon.firebaseio.com/plants/').limit(20);
        this.bindAsArray(ref, 'plants');
      },

    render() {
        var filtered = this.state.plants.slice(0, 10);
        return (
            <div className="toyon">
                <Navbar fixedTop>
                    <NavBrand>Toyon</NavBrand>
                    <Nav right>
                        <NavItem>{this.state.plants.length} plants</NavItem>
                    </Nav>
                </Navbar>
                <PlantList plants={filtered} />
            </div>
        );
    }
});
