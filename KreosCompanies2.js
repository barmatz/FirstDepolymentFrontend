const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const rp = require('request-promise');
const url = 'http://www.kreoscapital.com/portfolio/';

app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

let INVESTMENTS;

rp(url)
  .then(function(html){
    //success!
    INVESTMENTS = JSON.parse(
    	html.substring(html.indexOf('INVESTMENTS') + 13, html.indexOf("</script><div class=") - 2)
    );  
  })
  .catch(function(err){
    throw(err);
  });

app.get("/", function(req, res){
	res.send(INVESTMENTS)
})

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log("Server connected to KreosScraper backend");
});