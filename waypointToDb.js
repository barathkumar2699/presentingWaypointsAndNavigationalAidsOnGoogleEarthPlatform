let fs = require('fs');
var waypointModel = require('./models/waypointData');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://barath:barath@cluster0-mioxh.mongodb.net/SIH', { useNewUrlParser: true }, () => {
    console.log(`Connected to db`)
});


fs.readFile('./waypoints1.txt', {encoding: 'utf-8'}, (err, data) => {
    // console.log(data);
    var waypointArray = data.split(',\r\n');
    // console.log(waypointArray[0]);
    // console.log
    console.log(waypointArray.length);

    waypointArray.forEach(element => {
        // console.log(element);
        element = element.replace('[', ' ').replace(']', ' ').replace("'", '').replace("'", '');
        let elementArray = element.split(',');

        var obj = {
            via: elementArray[0],
            lat: parseFloat(elementArray[1]),
            long: parseFloat(elementArray[2])
        };
        try {
            waypointModel.create(obj);
        }
        catch(err){
            //Poda Punda
        }

    });

});