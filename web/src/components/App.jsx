import React from 'react';
import { Link }  from 'react-router';
import { Navbar, NavBrand, Nav, NavItem } from 'react-bootstrap';
import PlantList from './PlantList.jsx';
import Request from 'superagent';

export default React.createClass({
    getInitialState: function() {
        return {
            plants: []
        };
    },

    componentDidMount() {
        var self = this;
        Request.get('https://s3-us-west-1.amazonaws.com/toyon/toyon_pruned.json.gz')
            .end(function(err, res){
                self.setState({plants: res.body.plants});
        });
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
