const { Router } = require("express");
const { User } = require("../models");
const router = Router();

// http://localhost:8080/users/signUp => 라는 경로로 요청이 들어옴 
// (회원가입 : 3번)
router.post("/signUp", async (req, res, next) => {
    // async를 사용하는 이유는 => database접근을 하게 되므로 작성을 하는데,
    // 데이터를 가져오지 않았는데 다음 코드를 실행 시키는걸 방지하기 위해 작성.

    // 요청이 들어온 body의 email, password, name을 가져옴.
    let { email, password, name } = req.body;

    // 이미 존재하는 회원인지 확인하기 위해서, 일치하는 email이 있는지 가져오는 부분.
    let checkEmail = await User.findOne({ email });

    // {data} === true or {} === false
    if (checkEmail) {
        //email이 존재하다면?
        // 에러코드인 http 상태코드 500
        res.status(500);
        // 에러 응답을 해줌
        res.json({
            message: "이미 존재하는 회원입니다.",
            status: false
        })
        return;
    }

    //존재하지 않는 회원이니깐 들어온 요청 데이터로 회원을 생성.
    await User.create({ email, password, name });

    //회원가입이 완료되었다는 응답처리.
    res.json({
        message: "회원 가입에 성공하였습니다.",
        status: true
    })

});

// http://localhost:8080/users/login
// 클라이언트에서 로그인 요청을 보내서 실행 되는 부분. (로그인 : 3번)
router.post("/login", async (req, res, next) => {

    let { email, password } = req.body;

    // 회원이 존재하는지 확인하기위해서, 일치하는 email이 존재하는지 확인
    let checkEmail = await User.findOne({ email });

    if (!checkEmail) {
        //회원가입이 안되어있는 상태
        res.status(401);
        res.json({
            message: "존재하지 않는 회원입니다.",
            status: false
        });
        return;
    }
    if (checkEmail.password !== password) {
        //DB에 있는 회원의 비번과 요청들어온 비번이 일치하지 않는다면?
        res.status(401);
        res.json({
            message: "비밀번호가 일치하지 않습니다.",
            status: false
        })
        return;
    }

    // jwt라는 토큰을 발행함.

    //회원의 정보를 응답, (비번 X)
    res.json({
        status: true,
        email: checkEmail.email,
        name: checkEmail.name
    })


})


module.exports = router;