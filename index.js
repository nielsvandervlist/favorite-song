const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const MongoClient = require('mongodb').MongoClient
MongoClient.connect(
    'mongodb+srv://nielsvandervlist:3gTDu39Q@cluster0.ugrwv.mongodb.net/favorite-song?retryWrites=true&w=majority', 
    {useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('favorite-song')
        const songs = db.collection('songs')

        app.use(bodyParser.urlencoded({ extended: true }))
        app.listen(3000, () => {
            console.log('listening on 3000')
        })
        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html')
        })
        app.get('/mysongs', (req, res) => {
            songs.find().toArray()
            .then(results => {
                console.log(results);
            })
            .catch(error => console.log(error))
        })
        app.post('/songs', (req, res) => {
            songs.insertOne(req.body)
              .then(result => {
                res.redirect('/');
              })
              .catch(error => console.error(error))
        })

    })
    .catch(error => console.error(error))