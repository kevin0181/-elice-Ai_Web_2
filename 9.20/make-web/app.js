const express = require("express");
const app = express();
const bodyParser = require('body-parser');

let userData = [];

// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); //이걸 통해 html의 form을 통해 들어오는 데이터를 처리한다.

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/page/login", (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
})

app.get("/page/signUp", (req, res) => {
    res.sendFile(__dirname + "/views/signUp.html");
})

app.post("/signUp", (req, res) => {
    // console.log(req.body);
    let { id, pwd, name } = req.body;
    // console.log(id, pwd, name);

    userData.push({ id, pwd, name });
    // console.log(userData);

    res.json({ message: "회원가입에 성공하였습니다." });

})

app.post("/login", (req, res) => {
    let { id, pwd } = req.body;

    for (let i = 0; i < userData.length; i++) {
        if (id === userData[i].id) {
            if (pwd === userData[i].pwd) {
                res.json({ message: "로그인에 성공하였습니다." });
                return;
            }
        }
    }

    res.json({ message: "로그인에 실패하였습니다." });

})

app.get("/page/success", (req, res) => {
    res.sendFile(__dirname + "/views/success.html")
})

app.listen(8080, () => {
    console.log("server open");
})