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
    console.log('DB connection estabilished');
});

app.use(express.json());
app.use('/', express.static('./assets'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/assets/index.html');
});

app.get('/search', (req, res) => {
    connection.query('SELECT * FROM licence_plates WHERE plate="' + req.query.q + '"', (err, result) => {
        if (err) {
            console.error('Error occured during database query');
        } else {
            let answer = {
                result: "ok",
                data: result
            }
            res.json(answer);
        }
    });
})

app.get('/search', (req, res) => {
    connection.query('SELECT * FROM licence:plates WHERE car_brand="' + req.params.brand + '"', (err, result) => {
        if (err) {
            console.error('Error occured during database query');
        } else {
            let answer = {
                result: "ok",
                data: result
            }
            res.json(answer);
        }
    })
})

app.listen(port, error => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server running, at ' + port);
    } 
});