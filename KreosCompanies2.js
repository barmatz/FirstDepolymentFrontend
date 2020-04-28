const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")

const rp = require('request-promise');
const url = 'http://www.kreoscapital.com/portfolio/';

app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

let INVESTMENTS;

rp(url)
  .then(function(html){
    INVESTMENTS = JSON.parse(
    	html.substring(html.indexOf('INVESTMENTS') + 13, html.indexOf("</script><div class=") - 2)
    );  
  })
  .catch(function(err){
    throw(err);
  });

app.get("/", function(req, res){
	res.json(INVESTMENTS)
})

// Provide an experimental front-end client
app.get('/client', expresOs.static(path.resolve(__dirname, 'client')));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log("Server connected to KreosScraper backend");
});