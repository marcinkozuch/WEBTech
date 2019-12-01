const express = require("express");
const app = express();
const request = require("request");

app.use(express.static("public"));
app.use(express.static("views"));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  req.headers["User-Agent"] = "Awesome-Octocat-App";
  //console.log("headers:::", req.headers);

  var searchTerm = req.query.searchterm;

  const options = {
    url: "https://api.github.com/search/users?q=" + searchTerm,
    headers: {
      "User-Agent": "Awesome-Octocat-App"
    }
  };

  request(options, function(error, response, body) {
    if (error) {
      console.log(error);
    } else {
      var data = JSON.parse(body);
      //let data = "";
      console.log("test-data1", data);
      res.render("users", {
        resData: data
      });
    }
  });
});

app.listen(8080, function() {
  console.log("Listening");
});
