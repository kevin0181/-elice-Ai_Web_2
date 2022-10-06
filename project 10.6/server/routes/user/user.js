const { Router } = require("express");
const crypto = require("crypto");
const { User } = require("../../models");
const router = Router();

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


const passwordHash = (password) => {
    return crypto.createHash("sha1").update(password).digest("hex");
}

module.exports = router;