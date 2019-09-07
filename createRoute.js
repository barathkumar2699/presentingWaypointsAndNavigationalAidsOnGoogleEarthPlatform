var mapModel = require('./models/map');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://barath:barath@cluster0-mioxh.mongodb.net/SIH', { useNewUrlParser: true }, () => {
    console.log(`Connected to db`)
});

var waypoints = [
    {
        index: 0,
        via: 'TEBID',
        fromDistance: 35.3,
        toDistance: 14.0
    }, {
        index: 1,
        via: 'BIKIK',
        fromDistance: 14.0,
        toDistance: 81.0
    }, {
        index: 2,
        via: 'MONDA',
        fromDistance: 81.0,
        toDistance: 74.0
    }, {
        index: 3,
        via: 'PATNA-VOR/DME',
        fromDistance: 74.0,
        toDistance: 85.7
    }, {
        index: 4,
        via: 'BODOG',
        fromDistance: 85.7,
        toDistance: 151.0
    }
];

var route =
{
    name: 'A201',
    waypoints
};

var map = {
    from: 'RAJSHAHI',
    to: 'LUCKNOW',
    route
};

mapModel.create(map, (err, mapDoc) => {
    console.log(mapSavedDoc)
    mongoose.disconnect()
});
