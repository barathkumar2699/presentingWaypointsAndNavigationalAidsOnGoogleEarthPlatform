var express = require('express')
var mongoose = require('mongoose')
var hbs = require('hbs')
var bodyParser = require('body-parser')
var mapModel = require('./models/map')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var authenticate = require('./config/authenticate')
var app = express()
var waypointDataModel = require('./models/waypointData')
var port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server listening in ${port}`)
})
mongoose.connect('mongodb+srv://barath:barath@cluster0-mioxh.mongodb.net/SIH', { useNewUrlParser: true }, () => {
    console.log(`Connected to db`);
})

app.use(require('morgan')('dev'));
app.set('view engine', 'hbs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(session({
    secret: "yoganathanIsTheFounderOfUserInterfaceDesign",
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'passportSessions'
    })
}));
app.use(authenticate.initialize());
app.use(authenticate.session());

app.post('/skipLocation', async (req, res) => {
    let waypoints = await waypointDataModel.find();
    let flag = 0;
    waypoints.forEach(element => {
        console.log(parseFloat(element.lat) - parseFloat(req.body.lat));
        if (flag == 0)
            if (parseFloat(element.lat) - parseFloat(req.body.lat) < 1 && parseFloat(element.lat) - parseFloat(req.body.lat) > -1) {
                res.json({
                    via: element.via,
                    lat: element.lat,
                    lng: element.long,
                    distance: parseFloat(element.lat) - parseFloat(req.body.lat)
                });
                flag = 1;
            }
    });
})

app.get('/home', (req, res) => {
    res.render('opening');
})

app.get('/',(req,res) => {
    res.redirect('/login');
})

app.get('/register', (req, res) => {
    if (req.user) {
        res.redirect('/home');
    } else {
        res.render('signup');
    }
});
app.get('/twotrail', (req, res) => {
    res.render('twotrail');
})
app.get('/login', (req, res) => {
    if (req.user) {
        res.redirect('/home');
    } else {
        res.render('login');
    }
});

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

app.post('/login', authenticate.authenticate('local', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/home');
});

app.post('/register', (req, res) => {
    console.log(req.body);
    authenticate.addUser(req.body, (err, user) => {
        if (err) {
            res.end('Registeration failed');
        } else {
            res.redirect('/login');
        }
    });
});

app.get('/getValues', (req, res) => {
    mapModel.find({ "from": "RAJSHAHI" }, (err, docs) => {
        res.json({
            err,
            docs
        })
    })
})

app.get('/getDirections', (req, res) => {
    res.render('details');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/getLocation', (req, res) => {
    res.render('getLocation');
})
app.get('/traildis', (req, res) => {
    res.render('traildis');
})
//app.get('/blocked', (req, res) => {
  //  res.render('blocked');
//})
app.get('/mainmap', (req, res) => {
    res.render('mainmap');
})
app.get('/blocked', (req, res) => {
    res.render('blocked');
})

app.get('/searchmap',(req,res) => {
    res.render('searchmap');666666666666
})

app.post('/getLocation', (req, res) => {
    waypointDataModel.findOne({ via: new RegExp(req.body.name) }, (err, location) => {
        res.json({ err, location });
    })
});

app.get('/viewmap',(req,res) => {
    res.render('viewMap');
})
app.get('/firstpointed',(req,res) => {
    res.render('firstpointed');
})

app.post('/skip', (req,res) => {
    waypointDataModel.findOne({lat: {$gte: req.body.lat + 5,$lte: req.body.lat - 5}},(err,doc) => {
        res.json(doc);
    })
})

app.post('/getDirections', function (req, res) {
    var finalData = [];
    mapModel.find({ from: new RegExp(req.body.from), to: new RegExp(req.body.to) }, async (err, allDirections) => {
        console.log(allDirections);
        for (let i = 0; i < allDirections.length; i++) {
            let directions = allDirections[i];
            let routes = [];
            let position = [];
            let loc = {
                from: req.body.from,
                to: directions.route.waypoints[0].via
            };
            routes.push(loc);
            for (let index = 0; index < directions.route.waypoints.length; index++) {
                let location = await waypointDataModel.findOne({ via: new RegExp(directions.route.waypoints[index].via) });
                directions.route.waypoints[index].lat =  location.lat;
                directions.route.waypoints[index].long = location.long;
                if (index != 0) {
                    let plot = {
                        from: directions.route.waypoints[index - 1].via,
                        to: directions.route.waypoints[index].via
                    };
                    let latlong = {
                        from: {
                            center: {
                                lat: parseFloat(directions.route.waypoints[index - 1].lat),
                                lng: parseFloat(directions.route.waypoints[index - 1].long)
                            }
                        },
                        to: {
                            center: {
                                lat: parseFloat(directions.route.waypoints[index].lat),
                                lng: parseFloat(directions.route.waypoints[index].long)
                            }
                        }
                    }
                    position.push(latlong);
                    routes.push(plot);
                } else if (index == 0) {
                    let locinit = await waypointDataModel.findOne({ via: new RegExp(req.body.from) });
                    let latlong = {
                        from: {
                            center: {
                                lat: parseFloat(locinit.lat),
                                lng: parseFloat(locinit.long)
                            }
                        },
                        to: {
                            center: {
                                lat: parseFloat(directions.route.waypoints[index].lat),
                                lng: parseFloat(directions.route.waypoints[index].long)
                            }
                        }
                    };
                    position.push(latlong);
                }
                // console.log(directions.route.waypoints[index])
                // console.log(location)
            }
            let locend = {
                from: directions.route.waypoints[directions.route.waypoints.length - 1].via,
                to: req.body.to
            };

            let locendplot = await waypointDataModel.findOne({ via: new RegExp(req.body.to) });
            let latlong = {
                to: {
                    center: {
                        lat: parseFloat(locendplot.lat),
                        lng: parseFloat(locendplot.long)
                    }
                },
                from: {
                    center: {
                        lat: parseFloat(directions.route.waypoints[directions.route.waypoints.length - 1].lat),
                        lng: parseFloat(directions.route.waypoints[directions.route.waypoints.length - 1].long)
                    }
                }
            };
            position.push(latlong);
            routes.push(locend);
            let data = {
                directions,
                routes,
                position
            };
            finalData.push(data);
        }
        res.json(finalData);

    });

});

// async function getDirections() {
//     mapModel.findOne({ from: req.body.from, to: req.body.to }, (err, directions) => {
//         // directions.route.waypoints.forEach(element => {
//         //     // console.log(element);
//         //     waypointDataModel.findOne({ via: " " + element.via }, (err, location) => {
//         //         // console.log(location)
//         //         element.lat = location.lat;
//         //         element.long = location.long;
//         //         console.log(element)
//         //     });
//         // });
//         for (let index = 0; index < directions.route.waypoints.length; index++) {
//             let location = await waypointDataModel.findOne({ via: " " + directions.route.waypoints[index].via });
//             // console.log(location)
//             directions.route.waypoints[index].lat = location.lat;
//             directions.route.waypoints[index].long = location.long;
//             console.log(directions.route.waypoints[index])
//             console.log(location)
//         }

//     });
//     return { err, directions };
// }

// app.get('/registerRoute',(req,res) => {
//     res.render('registerRout', {
//         routes: req.params.routes,
//         waypoints: req.params.waypoints
//     })
// })

// app.post('/postRoute')