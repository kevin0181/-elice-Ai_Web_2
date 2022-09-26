//외부 모듈은 이름을 통해서 가져올 수 있음
const express = require("express");//외부 모듈을 가져온 // 서버 실행 1번
const mongoose = require("mongoose"); // 외부 모듈을 가져온 //db 실행 1번
const cors = require("cors"); // cors오류를 해결하기 위해 가져온 외부 모듈
// posts?id=1 <= 이런 형태로 들어오는 데이터를 읽을 수 있도록 파싱
const bodyParser = require("body-parser");
 
//직접 만든 파일은 경로를 통해서 가져옵니다.
//직접 만든 js파일을 가져온거고, 그리고 직접 만든 js파일은 뒤에 확장자명이 붙지않는다.
//css, json같은 파일들은 확장자 명이 붙습니다.
const postRouter = require("./routes/posts");

const app = express(); //=> 요거는 고정되어있으므로 항상 사용한다. //서버 실행 2번

const URL = 'mongodb://localhost:27017/myapp'; //mongodb url 가져옴 //db 실행 2번

mongoose.connect(URL); // mongodb 연결하는 부분(실질적으로 디비를 연결하는곳) // db 실행 3번 

app.use(cors()); //원래는 client 주소가 있어야함.
app.use(bodyParser.urlencoded({ extended: true }));

// post 요청을 했을때 들어오는 body값을 읽을수가 없어서, 요 코드 사용
app.use(express.json());

//http://localhost:8080/posts
app.use("/posts", postRouter);

const dbConnectionStatus = mongoose.connection; //db의 connection상태를 확인하기 위해.

dbConnectionStatus.on('error', (err) => {
    console.log(err);
});

dbConnectionStatus.once('open', () => {
    console.log("DB Connection Success");
})

app.listen(8080, () => { //서버를 생성하기위해 listen함수를 사용 그 포트가 8080 //서버 실행 3번
    console.log("server open");
})

