const http = require('http');
const express = require('express');
const cors = require('cors');



const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let lottoNumbersRouter = require("./LottoNumbers");

app.use("/numbers",lottoNumbersRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});