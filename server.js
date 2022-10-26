// install dependencies 
const express = require('express')
const path = require("path")
const fs = require('fs')
// need to have the full path name for the readFileSync
const notes = JSON.parse(fs.readFileSync('develop/db/db.json', 'utf8'))

//creates a random generated ID for each note entry
const NewID = () => {
    return 'id-' + Math.random().toString(36).substring(2, 16);
}


//initiate the express app

const app = express();
const PORT = process.env.PORT || 3000;

//=============================================
//parsing middleware for the application
//=============================================

app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use(express.static("./public/"))

//=============================================
//paths for assets to populate on server routes
//=============================================

// path to send file to the homepage
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/index.html") )
})

// path is the default route for get
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// path to send files to the notes page.
app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});


//=======================================
//API routes
//=======================================



app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
            res.json(JSON.parse(data))
        });
});

app.post('/api/notes', (req,res) => {
    let newNote = req.body;
    //need to make an id
    newNote.id = NewID();
    notes.push(newNote);
    fs.writeFileSync("develop/db/db.json", JSON.stringify(notes));
    res.json(notes);

});





//=======================================
//Listening port
//=======================================

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})