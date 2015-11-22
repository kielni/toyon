import React from 'react';
import { Link }  from 'react-router';
import PlantList from './PlantList.jsx';
import Navbar from './Navbar.jsx';
import Request from 'superagent';

const pageSize = 3;

export default React.createClass({
    getInitialState: function() {
        return {
            plants: [],
            filters: {
                sun: ['sun', 'partial', 'shade'],
                water: ['none', 'low', 'moderate'],
                size: ['low', 'small', 'medium', 'large']
            }
        };
    },

    showMore: function() {
        this.setState({to: Math.min(this.state.plants.length-1, this.state.to+pageSize)});
    },

    componentDidMount() {
        var self = this;
        Request.get('https://s3-us-west-1.amazonaws.com/toyon/toyon_pruned.json.gz')
            .end(function(err, res){
                self.setState({
                    plants: res.body.plants,
                    to: pageSize
                });
        });
        Materialize.scrollFire([
            { selector: '#moreMarker', offset: 0, callback: this.showMore, repeat: true }
        ]);
    },

    render() {
        if (!this.state.plants) {
            return (
                <div class="progress">
                  <div class="indeterminate"></div>
                </div>
            );
        }
        // TODO: filters
        var filtered = this.state.plants;
        var counts = {
            filtered: filtered.length,
            total: this.state.plants.length
        };
        return (
            <div className="toyon">
                <Navbar filters={this.state.filters} counts={counts} />
                <PlantList plants={filtered.slice(0, this.state.to)} />
                {
                    (this.state.to < filtered.length) ?
                        <div id="moreMarker" className="chip">More...</div>
                    : ''
                }
            </div>
        );
    }
});
