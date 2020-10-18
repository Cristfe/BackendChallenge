'use strict';

const express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
const app = express();

//url from API
var url = "https://api.exchangeratesapi.io/2008-10-07?symbols=GBP,HKD,USD";

//use bodyParser for extract the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('json spaces', 2)

// Routes
app.get('', function (req, res) {
  request({
    url: url,
    json: true,
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  })
});

app.listen(3000, function () {
  console.log('Server is running..');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Serverless Error');
});

module.exports = app;
