const { Router } = require("express");
const { User } = require("../models");
const router = Router();

router.post("/signUp", async (req, res, next) => {
    let { email, password, name } = req.body;

    let checkEmail = await User.findOne({ email });
    console.log(checkEmail);

    if (checkEmail) {
        //email이 존재하다면?
        res.status(500);
        res.json({
            message: "이미 존재하는 회원입니다.",
            status: false
        })
        return;
    }

    await User.create({ email, password, name });

    res.json({
        message: "회원 가입에 성공하였습니다.",
        status: true
    })

});


router.post("/login", async (req, res, next) => {

    let { email, password } = req.body;

    let checkEmail = await User.findOne({ email });

    if (!checkEmail) {
        //회원가입이 안되어있는 상태
        res.status(401);
        res.json({
            message: "존재하지 않는 회원입니다.",
            status: false
        })
        return;
    }

    if (checkEmail.password !== password) {
        //비밀번호가 틀림
        res.status(401);
        res.json({
            message: "비밀번호가 일치하지 않습니다.",
            status: false
        })
        return;
    }

    // jwt라는 토큰을 발행함.

    res.json({
        status: true,
        email: checkEmail.email,
        name: checkEmail.name
    })


})


module.exports = router;