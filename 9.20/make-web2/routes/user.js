const express = require("express")
const router = express.Router();

let userData = []; //회원 가입한 사람들을 저장 <= 로그인할때 확인

// GET http://localhost:8080/user/login => 로그인 페이지를 보여주고.
router.get("/login", (req, res, next) => {
    res.render("login.html")
});

// http://localhost:8080/user/signUp => 
router.get("/signUp", (req, res, next) => {
    res.render("signUp.html");
})

//로그인 순서 : 3번
router.post("/login", (req, res, next) => {

    //가져온 데이터를 req.body에서 꺼내옴
    let { id, pwd } = req.body;

    //for문을 돌려서 회원가입을 한 데이터가 존재하는지 확인을 하는 로직
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].id === id) {
            if (userData[i].pwd === pwd) {
                // 아이디와 비밀번호 둘다 일치한다면 응답.
                res.json({ message: "로그인을 성공하였습니다." });
                return;
            } else {
                res.json({ message: "비밀번호가 일치하지 않습니다." })
                return;
            }
        } else {
            res.json({ message: "아이디나 비밀번호가 일치하지 않습니다." });
        }
        res.json({});
    }

})

//회원가입 순서 : 3번
router.post("/signUp", (req, res, next) => {
    // 순서 2번에서 보내온 데이터들을 req.body를 통해 가져옴
    let { id, pwd, name } = req.body;

    //가져온 데이터를 userData 배열에 push
    userData.push({ id, pwd, name });

    //회원가입 완료 메시지 응답
    res.json({ message: "회원 가입을 완료하였습니다." });
});


module.exports = router;