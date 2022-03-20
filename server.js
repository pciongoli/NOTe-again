const express = require('express')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if (err) { console.log(err); return; }
        console.log("Successfully read json")
        res.send(data);
    });
})

app.post('/api/notes', (req, res) => {

})

// test endpoint
app.post('/test', (req, res) => {
    var temp = req.body['note_name'];
    res.send("Hi this is a note" + temp);
})

app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
});