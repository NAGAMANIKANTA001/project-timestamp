// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
const getResponse = (date) => {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let dateString = `${days[date.getUTCDay()]}, ${String(date.getUTCDate()).padStart(2,'0')} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} ${String(date.getUTCHours()).padStart(2,'0')}:${String(date.getUTCMinutes()).padStart(2,'0')}:${String(date.getUTCSeconds()).padStart(2,'0')} GMT`
  console.log(date);
  let unix = date/1;
  return ({
    "unix":unix,
    "utc":dateString
  })
}
app.get("/api/:date",(req,res)=>{
  let date=null;
  try {
    date = new Date(req.params.date);
  } catch(err) {

  }
  if(date===null || date == "Invalid Date") {
    try{
      date = new Date(parseInt(req.params.date))
    } catch(err) {
      res.json({ error : "Invalid Date" })
    }
  }
  if(date == "Invalid Date") {
    res.json({ error : "Invalid Date" }) 
  }
  res.json(getResponse(date))
})
app.get("/api",(req,res)=> {
  let date = new Date();
  res.json(getResponse(date))
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
