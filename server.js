// install dependencies 
const express = require('express');
const path = require("path");
const fs = require('fs');
const uuid = require('uuid');


//initiate the express app

const app = express();
const PORT = process.env.PORT || 3000;

//=============================================
//parsing middleware for the application
//=============================================

app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

//=============================================
//paths for assets to populate on server routes
//=============================================

// path to send file to the homepage
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html") )
})

// path is the default route for get
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// path to send files to the notes page.
app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});


//=======================================
//API routes
//=======================================



app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf-8', (err, data) => {
        if (err) throw err;
            res.json(JSON.parse(data))
        });
});

app.post('/api/notes', (req,res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), 'utf-8', (err, data) => {
        let database = JSON.parse(data);
        database.push({
            id: uuid.v4(),
            ...req.body,
        });
        fs.writeFile(
            path.join(__dirname, ".db/db.json"), 
            JSON.stringify(db, null, 2),
            (err, data) => {
                if (err) throw err;
                res.json(db);    
            }
        );
    });
});


//=======================================
//Listening port
//=======================================

app.listen(PORT, () => 
    console.log(`app listening on port ${PORT}`));