const wavePoint = require('./models/waypointData');

wavePoint.find({},(err,data)=>{
    if(err) throw err;
    console.log(data);
})