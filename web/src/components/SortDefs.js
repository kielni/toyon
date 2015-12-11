import FilterDefs from './FilterDefs';

function minIndex(srcArray, values) {
    return Math.min(...srcArray.map((val) => {
        return srcArray.indexOf(val);
    }));
}

export default {
    keys: ['botanical', 'common', 'water', 'sun', 'height', 'spread'],

    botanical: {
        label: 'Botanical name',
        compare: function(a, b) {
            return a.name.botanical.localeCompare(b.name.botanical);
        }
    }, 
    common: {
        label: 'Common name',
        compare: function(a, b) {
            return a.name.common.localeCompare(b.name.common);
        }
    },
    water: {
        label: 'Water',
        compare: function(a, b) {
            let wa = minIndex(FilterDefs.water.values, a.water.range);
            let wb = minIndex(FilterDefs.water.values, b.water.range);
            return wa === wb ? 0 : wa < wb ? -1 : 1;
        }
    },
    sun: {
        label: 'Sun',
        compare: function(a, b) {
            let sa = minIndex(FilterDefs.sun.values, a.sun.range);
            let sb = minIndex(FilterDefs.sun.values, b.sun.range);
            return sa === sb ? 0 : sa < sb ? -1 : 1;
        }
    },
    height: {
        label: 'Height',
        compare: function(a, b) {
            let ha = a.height.avg;
            let hb = b.height.avg;
            return ha === hb ? 0 : ha < hb ? -1 : 1;
        }
    },
    spread: {
        label: 'Spread',
        compare: function(a, b) {
            let sa = a.spread.avg;
            let sb = b.spread.avg;
            return sa === sb ? 0 : sa < sb ? -1 : 1;
        }
    }
};
