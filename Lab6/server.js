const express = require("express");
const app = express();
const request = require("request");

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res, next) {
  res.json({
    status: "Sukces"
  });
});

app.get("/users", function(req, res) {
  var searchTerm = req.query.searchterm;
  console.log(searchTerm);
  request("https://api.github.com/search/users?q=" + searchTerm, function(
    error,
    response,
    body
  ) {
    if (error) {
      console.log(error);
    } else {
      var data = JSON.parse(body);
      res.render("users", {
        picData: data
      });
    }
  });
});

app.get("/search", function(req, res) {
  res.render("search");
});

app.listen(8080, function() {
  console.log("Listening");
});
