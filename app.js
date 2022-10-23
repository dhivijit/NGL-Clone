//esversion:6

const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const useragent = require("express-useragent");
const expressip = require("express-ip");
const path = require("path");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const https = require("https");
const {
  monthReturn,
  dayReturn,
  getDate,
  getTime,
  randomText,
} = require("./FuncFile");

require("dotenv").config();

const port = process.env.PORT || 3000;

const adminPassword = process.env.ADMIN_PASSWORD;

if (adminPassword == "" || adminPassword == null) {
  console.log("Please set the admin password in the .env file");
  process.exit(1);
}

const imageURL = process.env.Profile_Picture;

if (imageURL == "" || imageURL == null) {
  console.log("Please set the profile picture URL in the .env file");
  process.exit(1);
}

if (process.env.INSTAGRAM_USERNAME == "" || process.env.INSTAGRAM_USERNAME == null) {
  console.log("Please set your instagram username in the .env file");
  process.exit(1);
}

https.get(imageURL, (res) => {
  const savepath = __dirname + "/public/media/" + "pfp.jpg";
  const writeStream = fs.createWriteStream(savepath);

  res.pipe(writeStream);

  writeStream.on("finish", () => {
    writeStream.close();
  });
});

const app = express();

app.use(cookieParser());

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(useragent.express());
app.use(expressip().getIpInfoMiddleware); //For getting the IP address

var AllQuestions = JSON.parse(
  fs.readFileSync(__dirname + "/data/questions.json")
);
var genTokens = JSON.parse(
  fs.readFileSync(__dirname + "/data/generatedtokens.json")
);

app.get("/", function (req, res) {
  //for the question submission page
  res.render("send", {
    username: process.env.INSTAGRAM_USERNAME,
  });
});

app.post("/sendChallenge", function (req, res) {
  IpAddress = req.ipInfo.ip.replace("::ffff:", "");
  userData = {
    IpAddress: IpAddress,
    browser: req.useragent.browser,
    version: req.useragent.version,
    os: req.useragent.os,
    platform: req.useragent.platform,
    source: req.useragent.source,
  };
  AllQuestions[randomText(7)] = {
    question: req.body.question,
    Time: getTime(),
    Date: getDate(),
    unread: false,
    userData: userData,
  };
  //Save the data to the file
  fs.writeFileSync(
    path.resolve(__dirname, "data/questions.json"),
    JSON.stringify(AllQuestions)
  );
  res.render("postsend");
});

app
  .route("/Admingadipage")
  .get((req, res) => {
    // for the admin page where the questions will be displayed
    //check for cookie when user opens the website then directly redirect to the admin page
    if (genTokens["tokens"].indexOf(req.cookies.userID) > -1) {
      res.render("questions", {
        questionCode: Object.keys(AllQuestions),
        AllData: AllQuestions,
      });
    }

    res.render("signin", {
      incorrectPassword: 0,
    });
  })
  .post((req, res) => {
    if (req.body.password === adminPassword) {
      if (req.body.remember === "on") {
        generatedID = randomText(10);
        genTokens["tokens"].push(generatedID);
        fs.writeFileSync(
          path.resolve(__dirname, "data/generatedtokens.json"),
          JSON.stringify(genTokens)
        );
        res.cookie("userID", generatedID);
      }
      res.render("questions", {
        questionCode: Object.keys(AllQuestions),
        AllData: AllQuestions,
      });
    } else {
      res.render("signin", {
        incorrectPassword: 1,
      });
    }
  });

app.get("/question/:idofquestion", (req, res) => {
  //res.send(Questions[req.params.idofquestion]);
  if (genTokens["tokens"].indexOf(req.cookies.userID) > -1) {
    if (AllQuestions[req.params.idofquestion]) {
      res.render("selectedquestion", {
        Question: AllQuestions[req.params.idofquestion]["question"],
        questioncode: req.params.idofquestion,
        QuestionData: AllQuestions[req.params.idofquestion],
      });
      AllQuestions[req.params.idofquestion]["unread"] = true;
      fs.writeFileSync(
        path.resolve(__dirname, "data/questions.json"),
        JSON.stringify(AllQuestions)
      );
    } else {
      res.render("404");
    }
  } else {
    res.redirect("/");
  }
});

app.post("/deletecookietoken", (req, res) => {
  var receivedCookie = req.body.tokenvalue;
  receivedCookie = receivedCookie.replace("userID=", "");
  indexoftoken = genTokens["tokens"].indexOf(receivedCookie);
  if (indexoftoken > -1) {
    genTokens["tokens"].splice(indexoftoken, 1);
  }
  fs.writeFileSync(
    path.resolve(__dirname, "data/generatedtokens.json"),
    JSON.stringify(genTokens)
  );
  res.redirect("/Admingadipage");
});

app.post("/delete", (req, res) => {
  if (genTokens["tokens"].indexOf(req.cookies.userID) > -1) {
    delete AllQuestions[req.body.id];
    fs.writeFileSync(
      path.resolve(__dirname, "data/questions.json"),
      JSON.stringify(AllQuestions)
    );
    res.redirect("/Admingadipage");
  } else {
    res.redirect("/");
  }
});

app.listen(port, function () {
  console.log("Server started on port " + port);
});
