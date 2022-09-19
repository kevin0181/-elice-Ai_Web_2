const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());

let list = {
    name: "이름",
    age: "나이",
    local: "지역"
}

// database => 더미데이터
let userData = {
    id: "kevin",
    pwd: "1111"
}


app.get("/", (req, res) => { //http://localhost:8080/
    res.send("안녕하세요.");
})

app.get("/hi", (req, res) => { //http://localhost:8080/hi
    res.send("반갑습니다.");
})

app.get("/get/list", (req, res) => {
    res.send(list);
})

app.get("/get/index", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get("/get/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
})

app.get("/login", (req, res) => {
    console.log(req.query);
    let { id, pwd } = req.query;
    // let id = req.query.id;
    // let pwd = req.query.pwd;

    if (id !== userData.id) {
        //id가 틀린 부분
        res.send({ message: "", error: "아이디가 틀립니다." });
        return;
    }

    if (pwd !== userData.pwd) {
        //pwd가 틀린 부분
        res.send({ message: "", error: "비밀번호가 틀립니다." });
        return;
    }

    res.send({ message: "로그인 성공!", error: "" });


})


app.listen(8080, () => {
    console.log("server open : 8080");
})