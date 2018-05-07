var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var request = require('request');
var async = require('async');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
  var data = {};
  var api_key = 'your key here';
  var s_toSearch = 'WholesomeToplane';
  var URL = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + s_toSearch + '?api_key=' + api_key;

  async.waterfall([
    function(callback) {
      request(URL, function(err, response, body) {
        if(!err && response.statusCode == 200) {
          var json = JSON.parse(body);
          data.id = json[s_toSearch].id;
          data.name = json[s_toSearch].name;
          callback(null, data);
        } else {
          console.log(err);
        }
      });
    }
  ],
  function(err, data) {
    if(err) {
      console.log(err);
      return;
    }

    res.render('index', {
      info: data
    });
  });
});

var port = Number(process.env.PORT || 3000);
app.listen(port);