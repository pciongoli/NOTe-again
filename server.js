const express = require('express')
const fs = require('fs')
const path = require('path')
const uniqid = require('uniqid')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// show the index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})
// show the written notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

// show the taken notes
app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if (err) { console.log(err); return; }
        console.log("Successfully read json")
        res.send(data);
    });
})

// update new notes
app.post('/api/notes', (req, res) => {
    console.log("inside post")
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        var json = JSON.parse(data)
        // console.log("text")
        // console.log('title')
        // console.log(typeof(json))
        var newData = {}
        newData['id'] = uniqid();
        newData['text'] = req.body['text']
        newData['title'] = req.body['title']
        json.push(newData);

        // new_json = JSON.stringify(json)
        fs.writeFile('db/db.json', JSON.stringify(json) , (err, data) => {
            console.log("callback from writefile");
        })
    })
})

// test endpoint
app.post('/test', (req, res) => {
    var temp = req.body['note_name'];
    res.send("Hi this is a note" + temp);
})

app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
});