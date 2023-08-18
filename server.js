const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const dotenv = require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error: "));
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

let lottoNumbersRouter = require("./LottoNumbers");

app.use("/numbers",lottoNumbersRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});