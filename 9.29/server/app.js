const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

//라우팅 파일
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");

// express를 application 변수에 담음
const app = express();

// database connect
// mongodb에 접근, 맨뒤에 myapp2는 -> database의 이름.
mongoose.connect("mongodb://localhost:27017/myapp2");

// database connect success
// mongoose를 통해서 mongodb에 정상적으로 접근을 했는지 확인하는 부분.
mongoose.connection.once("open", () => {
    console.log("DB connect success");
});

//database connect fail
// mongoose를 통해서 mongodb에 정상적으로 접근하지 못했을 경우.
// mongodb url 확인.
// mongodb 서비스 시작 확인. => 구글링.
mongoose.connection.on("error", (err) => {
    console.log(err);
});

// 클라이언트와 서버의 주소가 서로 다를 경우 생기는 오류.
app.use(cors());
// 들어오는 요청의 body를 json으로 파싱
app.use(express.json());
// post요청에 url로 들어오게 되면 그거를 인코딩 해주는 부분.
// ex => /posts?data1=1&data2=2
/*
{
    data1 : 1,
    data2 : 2
}
*/
app.use(bodyParser.urlencoded({ extended: true }));


//router
// http://localhost:8080/posts/***** => 이 경로로 접근하는 모든 요청 처리
app.use("/posts", postRouter);
// http://localhost:8080/users/***** => 이 경로로 접근하는 모든 요청 처리
app.use("/users", userRouter);

// router에서 설정해준 경로 외, 다른 경로로 접근을 하게되는 경우 다음을 응답.
app.use((req, res, next) => {
    res.status(404);
    res.json({
        message: 'NOT FOUND',
        status: false
    })
});

// 오류처리 미들웨어로 next(e) => 처리해주는 부분
app.use((err, req, res, next) => {
    res.status(500);
    res.json({
        message: err.message,
        status: false
    })
})

// 실질적으로 express 서버를 생성 시키는 부분. (숫자는 포트번호 : 8080)
app.listen(8080, () => {
    console.log("server open 8080");
})









