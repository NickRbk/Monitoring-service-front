const express = require('express');
const path = require('path');
bodyParser = require('body-parser');

const app = express(),
  port = process.env.PORT,
  host = process.env.HOST;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static(__dirname + '/dist/monitoring-service-front'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname+'/dist/monitoring-service-front/index.html'))
});

app.listen(port, host, () => {
  console.log(`App running`);
});
