// install dependencies 
const express = require('express')
const path = require("path")
const fs = require('fs')

//initiate the express app

let app = express();
let PORT = process.env.PORT || 3000;

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
app.get("/"), (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html") )
}

// path is the default route for get
app.get("*"), (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
}

// path is to send files to the notes page.
app.get('/notes'), (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
}


//=======================================
//API routes
//=======================================


// 





//=======================================
//Listening port
//=======================================

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})