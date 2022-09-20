const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');


const userRouter = require("./routes/user");

// 서버가 읽을 수 있도록 HTML 의 위치를 정의해줍니다.
app.set('views', __dirname + '/views');

// 서버가 HTML 렌더링을 할 때, EJS엔진을 사용하도록 설정합니다.
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);



app.use(express.json()); // => body 로 들어오는 데이터를 json
app.use(express.urlencoded({ extended: false })); 
// => body에 문자열로 url이 들어오는걸 인코딩

app.use("/user", userRouter) // http://localhost:8080/user/ => 이 경로를 통해 userRouter에 접근

app.get("/", (req, res) => { // http://localhost:8080/
    res.render("index.html");
});

app.listen(PORT, () => {
    console.log("server open : " + PORT);
})