var mongoose = require('mongoose')
var routeModel = require('./route')

var mapSchema = mongoose.Schema({
    from: {
        type: String,
        reuired: true
    },
    to: {
        type: String,
        required: true
    },
    distance: {
        type: Number
    },
    route: {
        type: routeModel,
        reuired: true
    }
})

module.exports = mongoose.model('Map',mapSchema);