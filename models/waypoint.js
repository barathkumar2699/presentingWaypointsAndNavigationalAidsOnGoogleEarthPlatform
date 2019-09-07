var mongoose = require('mongoose')

var waypointSchema = mongoose.Schema({
    index: {
        type: Number,
        required: true
    },
    via: {
        type: String,
        reuired: true
    },
    lat: {
        type: mongoose.Schema.Types.Decimal128
    },
    long: {
        type: mongoose.Schema.Types.Decimal128
    },
    fromDistance: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    toDistance: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    }
})

module.exports = waypointSchema