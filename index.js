const express = require("express");
const app = express();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "WebConfig",
});
function main() {
  con.connect(function (err) {
    var slidetextsetting;
    if (err) throw err;
    console.log("DBconnected");
    ///getslidetextsetting
    var sql = "SELECT * FROM form_config";
    con.query(sql, function (err, result) {
      if (err) throw err;
      slidetextsetting = result[0];

      ///checktheme
      var gotpatch = false;
      var themes = ["red", "yellow", "white"];

      var responsepackage = {
        newpatch: gotpatch,
        theme: themes[1],
        slidetext: slidetextsetting,
        time: timeforpackage("time"),
      };

      app.get("/", (req, res) => {
        res.send(JSON.stringify(responsepackage));
      });

      app.listen(3000, () => {
        console.log("start server at 3000");
      });
    });
  });
}
///run///
main();

function timeforpackage(format) {
  let dateOb = new Date();
  let year = dateOb.getFullYear();
  let month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
  let date = ("0" + dateOb.getDate()).slice(-2);

  switch (format) {
    case "time":
      let hours = ("0" + dateOb.getHours()).slice(-2);
      let minutes = ("0" + dateOb.getMinutes()).slice(-2);
      let seconds = ("0" + dateOb.getSeconds()).slice(-2);
      var out = hours + ":" + minutes + ":" + seconds;
      break;
    case "y-m-d":
      var out = year + ":" + month + ":" + date;
      break;
    case "d-m-y":
      var out = date + ":" + month + ":" + year;
      break;
    case "m-d-y":
      var out = month + ":" + date + ":" + year;
    default:
      var out = year + ":" + month + ":" + date;
  }

  return out;
}
