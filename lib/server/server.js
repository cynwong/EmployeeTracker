const express = require("express");
const path = require("path");

const employeesRoutes = require("./routes/api_employees");
const rolesRoutes = require("./routes/api_roles");
const departmentsRoutes = require("./routes/api_departments");

const app = express();

//set static folder
app.use(express.static(path.resolve(__dirname,"..", "..", "public")));

// parsing application body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//import routes
app.get("/", (_,res) => res.sendFile(path.resolve(__dirname, "..","..", "public","index.html")));

app.use("/employees",employeesRoutes);
app.use("/roles",rolesRoutes);
app.use("/departments", departmentsRoutes);

app.use("*", (_,res) => res.redirect("/"));
module.exports = app;