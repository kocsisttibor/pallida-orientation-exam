'use strict'

const port = 8080;
const express = require('express');
const app = express();
let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'alma',
  database: 'licence_plate'
});

connection.connect(function(err) {
    if (err) {
        console.log('Error connecting to DB');
        return;
    }
    console.log('DB connection estabilished')
});

app.use(express.json());
app.use('/', express.static('./assets'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/assets/index.html');
});




app.listen(port, error => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server running, at ' + port);
    } 
});