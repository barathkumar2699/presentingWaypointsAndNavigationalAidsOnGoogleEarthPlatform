var mongoose = require('mongoose')
var waypointSchema = require('./waypoint')

var routeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    waypoints: {
        type: [waypointSchema],
        required: true
    }
});

module.exports = routeSchema
// module.exports = mongoose.model('Route',routeSchema);