const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user/user");

const app = express();

const PORT = 8080;

mongoose.connect('mongodb://localhost:27017/daily');

mongoose.connection.on('connected', () => {
    console.log('mongodb Connect Success');
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter);


app.listen(PORT, () => {
    console.log(`open server : ${PORT}`);
});