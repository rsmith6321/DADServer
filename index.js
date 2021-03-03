const express = require("express");
const app = express();
var mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
const prompt = require("prompt-sync")({ sigint: true });

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "WebConfig",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("DBconnected");
});
function response(callback) {
  var slidetextsetting;
  ///getslidetextsetting
  var sql = "SELECT * FROM form_config";
  con.query(sql, function (err, result) {
    if (err) throw err;
    slidetextsetting = result[0];

    //checkpatch
    var gotpatch = false;
    ///checktheme
    var themes = ["red", "yellow", "white"];

    var responsepackage = {
      newpatch: gotpatch,
      theme: themes[1],
      slidetext: slidetextsetting,
      time: timeforpackage("time"),
    };

    // app.get("/", (req, res) => {
    //   res.send(JSON.stringify(responsepackage));
    // });
    return callback(JSON.stringify(responsepackage));
  });
}

///run///
app.listen(3000, () => {
  console.log("start server at 3000");
  // const name = prompt("WHO ARE YOU:");

  // switch (name) {
  //   case "kiosk":
  //     var package = prompt("Your JSON Package: ");
  //     datapackage = JSON.parse(package);

  //     break;

  // default:
  //   console.log("notting for you");
  // }
});

app.post("/", (req, res) => {
  var machine_name = req.body.machine_name;
  console.log(machine_name);

  response(function (jsonresponse) {
    res.send(jsonresponse);
  });
});

// main();

////FUNCTIONS////
function timeforpackage(format) {
  let dateOb = new Date();
  let year = dateOb.getFullYear();
  let month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
  let date = ("0" + dateOb.getDate()).slice(-2);
  var out;
  switch (format) {
    case "time":
      let hours = ("0" + dateOb.getHours()).slice(-2);
      let minutes = ("0" + dateOb.getMinutes()).slice(-2);
      let seconds = ("0" + dateOb.getSeconds()).slice(-2);
      out = hours + ":" + minutes + ":" + seconds;
      break;
    case "y-m-d":
      out = year + ":" + month + ":" + date;
      break;
    case "d-m-y":
      out = date + ":" + month + ":" + year;
      break;
    case "m-d-y":
      out = month + ":" + date + ":" + year;
    default:
      out = year + ":" + month + ":" + date;
  }

  return out;
}
