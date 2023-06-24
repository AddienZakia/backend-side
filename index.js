const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
app.use(express.json());

require("dotenv").config();

let link = `mongodb+srv://addiendb:${process.env.mongo_password}@addiencluster.dhqvhkx.mongodb.net/?retryWrites=true&w=majority`;
let client;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/kelas/:id", (req, res) => {
  client
    .collection("kelas")
    .findOne({ nama: req.params.id })
    .then((data) => {
      if (data) return res.json(data);
      res.json({ status: 404, pesan: "Data Tidak ditemukan" });
    })
    .catch((err) => {
      res.json({ status: 404, pesan: "Data Tidak ditemukan" });
    });
});

app.get("/kelas", (req, res) => {
  client
    .collection("kelas")
    .find()
    .toArray()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ code: 404, message: "Data tidak ditemukan" });
    });
});

app.post("/kelas", (req, res) => {
  let w = req.body;

  client
    .collection("kelas")
    .insertOne(w)
    .then((re) => {
      res.status(201).json(w);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
});

MongoClient.connect(link)
  .then((res) => {
    client = res.db();
    app.listen(5500, () => {
      console.log("server on");
    });
  })
  .catch((err) => {
    console.error(err);
  });
