import React from 'react';
import PlantType from './PlantType.jsx';
import Sun from './Sun.jsx';
import Water from './Water.jsx';
import Size from './Size.jsx';
import SizeBucket from './SizeBucket.jsx';
import PlantGroup from './PlantGroup.jsx';
import MoreInfo from './MoreInfo.jsx';

export default React.createClass({
    getInitialState() {
        return {favorite: this.props.plant.favorite};
    },

    handleFavorite(event) {
        let newValue = !this.state.favorite;
        this.setState({favorite: newValue}, () => {
            this.props.onFavorite(this.props.plant.id, newValue);
        });
        ga('send', 'event', 'favorite', newValue ? 'favorite' : 'unfavorite', this.props.plant.name.botanical);
    },

    render() {
        var plant = this.props.plant;
        var size = plant.height && plant.spread ? <Size height={plant.height} spread={plant.spread} /> : '';
        var sizeBucket = plant.height && plant.height.bucket ? <SizeBucket bucket={plant.height.bucket} /> : '';
        var moreInfo = plant.search && Object.keys(plant.search).length > 0 ? <MoreInfo search={plant.search} /> : '';
        var group = plant.group ? <PlantGroup group={plant.group} /> : '';
        var favoriteIcon = this.state.favorite ? 'favorite' : 'favorite_border';
        return (
            <div className="info">
                <div className="row name">
                    <div className="col s6">
                        <div className="botanical-name">
                            {plant.name.botanical}
                        </div>
                        <div className="common-name">
                            {plant.name.common}
                        </div>
                    </div>
                    <div className="col s6 requirements-col">
                        <div className="row requirements">
                            <div className="col s4 sun-col">
                                <Sun sun={plant.sun.range} />
                            </div>
                            <div className="col s4">
                                <Water water={plant.water.range}/>
                            </div>
                            <div className="col s4">
                                {sizeBucket}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row details">
                    <div className="col s7">
                        {size}
                    </div>
                    <div className="col s5">
                        <PlantType type={plant.type} />
                        {group}
                    </div>
                </div>
                <div className="row details">
                    <div className="col s10">
                        {moreInfo}
                    </div>
                    <div className="col s1 favorite">
                        <a className="waves-effect waves-teal btn-flat" data={plant.id} onClick={this.handleFavorite}>
                            <i className="material-icons favorite-icon">{favoriteIcon}</i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});
