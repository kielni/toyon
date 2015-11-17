import React from 'react';
import { Link }  from 'react-router';
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
        if (!this.state.plants) {
            return (
                <div class="progress">
                  <div class="indeterminate"></div>
                </div>
            );
        }
        var filtered = this.state.plants.slice(0, 25);
        return (
            <div className="toyon">
                <div class="navbar-fixed">
                    <nav>
                        <div class="nav-wrapper">
                            <a href="#" className="brand-logo center">Toyon</a>
                            <span class="new badge">{this.state.plants.length} plants</span>
                        </div>
                    </nav>
                </div>
                <PlantList plants={filtered} />
            </div>
        );
    }
});
