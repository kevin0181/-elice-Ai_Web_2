const express = require("express");
const app = express();
const PORT = 8080;

const noteRouter = require("./routes/notes");


app.use(express.json());

// http://localhost:8080/notes => 설정해줌
app.use("/notes", noteRouter);

// http://localhost:8080/
app.use((req, res, next) => {
    res.status(404);
    res.send({
        result: 'fail',
        error: `Page not found ${req.path}`
    });
});

app.use((err, req, res, next) => {
    res.status(500);
    res.json({
        result: 'fail',
        error: err.message,
    });
});


app.listen(PORT, () => {
    console.log(`server open : ${PORT}`);
});