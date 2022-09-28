const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

//라우팅 파일
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");

const app = express();

// database connect
mongoose.connect("mongodb://localhost:27017/myapp2");

// database connect success
mongoose.connection.once("open", () => {
    console.log("DB connect success");
});

//database connect fail
mongoose.connection.on("error", (err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.use((req, res, next) => {
    res.status(404);
    res.json({
        message: 'NOT FOUND',
        status: false
    })
});

app.use((err, req, res, next) => {
    res.status(500);
    res.json({
        message: err.message,
        status: false
    })
})


app.listen(8080, () => {
    console.log("server open 8080");
})









