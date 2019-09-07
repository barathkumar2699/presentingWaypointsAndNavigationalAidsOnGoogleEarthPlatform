var mongoose = require('mongoose')

var waypointData = mongoose.Schema({
    
    via: {
        type: String,
        reuired: true
    },
    lat: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    long: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    }
})

module.exports = mongoose.model('waypoints', waypointData);