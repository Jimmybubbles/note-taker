// install dependencies 
const express = require('express')
const path = require("path")
const fs = require('fs')

//initiate the express app

let app = express();
let PORT = process.env.PORT || 3000;

//create parsers for the app.use

app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use(express.static("./public/"))

//=======================================
//API routes
//=======================================


// 

