var express = require('express');
var fs = require('fs');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  var buff = fs.readFileSync("./index.html");
  var str = buff.toString("utf-8");
  response.send(str);
});

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log("Listening on " + port);
});

