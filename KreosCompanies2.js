const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const rp = require('request-promise');
const url = 'http://www.kreoscapital.com/portfolio/';

app.use(bodyParser.urlencoded({extended: true}))

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
	if(err){
		throw new Error(err)
	} else{
		res.send(INVESTMENTS)
	}
})

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log("Server connected to KreosScraper backend");
});