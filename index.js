const express = require("express");
const app = express();
const hb = require("express-handlebars");
const projects = require("./projects.json");

app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.use(express.static("./projects"));
app.use(express.static("./public"));

app.get("/", (req, res) => {
    // 1st arg: name of the template
    // 2nd arg: object that contains all the data we need
    // for our template
    res.render("welcome", {
        projects,
    });
});

app.get("/:project/description", (req, res) => {
    const project = req.params.project;
    const selectedProject = projects.find((item) => item.directory == project);
    // goes through my projects array and compares the key 'name' to
    // the entered project name from the route
    if (!selectedProject) {
        return res.sendStatus(404);
    }
    res.render("description", {
        // info to be passed
        projects,
        selectedProject,
    });
});

app.listen(8080, () => console.log("Express server is at your service!"));
