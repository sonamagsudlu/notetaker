const fs = require("fs");
const db = require("../db/db.json");
const { uuid } = require("uuidv4");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    console.log(req.body)
    const note = {
      id: uuid(),
      title: req.body.title,
      text: req.body.text
    };

  fs.readFile("./db/db.json", "utf8", function (err, data) {
    console.log(data)
  try{
      const currentNotes = JSON.parse(data);
      currentNotes.push(note);

      fs.writeFile(
        "./db/db.json",
        JSON.stringify(currentNotes, null, 2),
        function (err) {
          if (err) {
            throw err;
          }
          res.send(db);
        }
      );
    }
    catch{
      console.log(err)
    }})
  });