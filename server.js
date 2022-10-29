// install dependencies 
const express = require('express');
const path = require("path");
const fs = require('fs');
const { json } = require('stream/consumers');
const data = JSON.parse(fs.readFileSync('develop/db/db.json', 'utf-8'));


//initiate the express app

const app = express();
const PORT = process.env.PORT || 3000;

//=============================================
//parsing middleware for the application
//=============================================

app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use(express.static('public'))

//=============================================
//paths for assets to populate on server routes
//=============================================

// path to send file to the homepage
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html") )
})



// path to send files to the notes page.
app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});





//=======================================
//API routes
//=======================================

app.get('/api/notes', (req, res) => {
    res.json(data)
});


app.get('/api/notes/:id', (req, res) => {
    res.json(data[Number(req.params.id)]);  
})

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let key = (data.length).toString();
    console.log(key);
    newNote.id = key;
    data.push(newNote);

    fs.writeFileSync('develop/db/db.json', JSON.stringify(data), (err) => {;
        if (err) throw (err);
    });

    res.json(data)
});

// delete notes

app.delete('/api/notes/:id', (req,res) => {
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note with ID ${noteID}`);
    data = data.filter(currentNote => {
        return currentNote.id != noteID;
    });
    for (currentNote of data) {
        currentNote.id = newID.toString();
        newID++;
    }
    fs.writeFileSync('develop/db/db.json', JSON.stringify(data));
    res.json(data);
});


//=======================================
//Listening port
//=======================================

app.listen(PORT, () => 
    console.log(`app listening on port ${PORT}`));