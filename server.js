const express = require('express')
const fs = require('fs')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('index.html');
})

app.get('/notes', (req, res) => {
    res.send('notes.html');
})


app.get('/api/notes', (req, res) => {
    var db = fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if (err) { console.log(err); return; }
        console.log("Successfully read json")
        console.log(db);
        res.send(data);
    });
    
    
})

// test endpoint
app.post('/test', (req, res) => {
    var temp = req.body['note_name'];
    res.send("Hi this is a note" + temp);
})

app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
});