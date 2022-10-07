const { Router } = require("express");
const crypto = require("crypto");
const { User } = require("../../models");
const router = Router();
const jwt = require("jsonwebtoken");
const jwtConfig = require("./../../config/jwtConfig");

// http://localhost:8080/user/signUp
// 회원가입 2번
router.post("/signUp", async (req, res, next) => {
    let { email, password, name } = req.body;

    let checkEmail = await User.findOne({ email });

    if (checkEmail) {
        res.json({
            status: false,
            message: "존재하는 이메일 입니다."
        })
        return;
    }

    //비밀번호를 그냥 쓴게아니고 *해쉬로 변경해서* DB에 저장을함
    // 안하면 벌금
    let hashPassword = passwordHash(password);

    //회원 저장
    await User.create({
        email,
        password: hashPassword,
        name
    })

    res.json({
        status: true,
        message: "회원가입이 완료 되었습니다."
    })

});

router.post('/login', async (req, res, next) => {
    // 이메일을 비교해서 존재하는 회원인지 확인
    // 비밀번호가 맞는지 확인
    let { email, password } = req.body;

    let checkEmail = await User.findOne({ email });

    if (!checkEmail) {
        res.json({
            status: false,
            message: "존재하지 않거나 일치하지 않는 이메일입니다."
        })
        return;
    }

    let hashPassword = passwordHash(password);

    if (hashPassword !== checkEmail.password) {
        res.json({
            status: false,
            message: '비밀번호가 틀렸습니다.'
        })
        return;
    }

    jwt.sign({
        email: checkEmail.email,
        name: checkEmail.name
    }, jwtConfig.secret, {
        expiresIn: '1d'
    }, (error, token) => {
        if (error) {
            res.status(401)
                .json({ status: false, message: "토큰 발행 실패" });
        } else {
            res.json({
                status: true,
                accessToken: token,
                email: checkEmail.email,
                name: checkEmail.name
            })
        }
    })

});



const passwordHash = (password) => {
    return crypto.createHash("sha1").update(password).digest("hex");
}

module.exports = router;