const express = require("express");
const path = require("path");
// const exphbs = require("express-handlebars");


const app = express();

//set static folder
app.use(express.static(path.resolve(__dirname,"..", "..", "public")));

// parsing application body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//set handlebars
// app.engine("handlebars", exphbs({defaultLayout: "main"}));
// app.set("view engine", "handlebars");

//import routes
app.use("/", (_,res) => res.sendFile(path.resolve(__dirname, "..","..", "public","index.html")));

module.exports = app;