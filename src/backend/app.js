require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
// const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");
// const bodyParser= require('body-parser');
var multer = require("multer");
var upload = multer();

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json());

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// console.log(process.env.MONGO_URL);
// Connection URL
const url = process.env.MONGO_URL;
// Database Name
const dbName = "workshop";

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  app.get("/rest/allUsers", (req, res) => {
    db.collection("users")
      .find({})
      .toArray((err, results) => {
        if (err) throw err;
        res.send(results);
      });
  });

  app.get("/rest/men", (req, res) => {
    db.collection("users")
      .find({ gender: "M" })
      .toArray((err, results) => {
        if (err) throw err;
        res.send(results);
      });
  });

  app.get("/rest/women", (req, res) => {
    db.collection("users")
      .find({ gender: "F" })
      .toArray((err, results) => {
        if (err) throw err;
        res.send(results);
      });
  });

  app.get("/rest/under18", (req, res) => {
    db.collection("users")
      .find({ age: { $lt: 18 } })
      .toArray((err, results) => {
        if (err) throw err;
        res.send(results);
      });
  });

  app.get("/rest/adults", (req, res) => {
    db.collection("users")
      .find({ age: { $gt: 17 } })
      .toArray((err, results) => {
        if (err) throw err;
        res.send(results);
      });
  });

  //create new user
  app.post("/rest/addUser", upload.none(), (req, res) => {
    console.log(req.body);

    db.collection("users").insertOne({ name : req.body.name, age : req.body.age, gender : req.body.gender })

  });

  app.use(express.static(path.join(__dirname, "../../build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../../build/index.html"));
  });

  app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
  );
});
