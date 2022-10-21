const { Router } = require("express");
const crypto = require("crypto");
const { User } = require("../../models");
const router = Router();
const jwt = require("jsonwebtoken");
const jwtConfig = require("./../../config/jwtConfig");
const nodemailer = require("nodemailer");

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


//http://localhost:8080/user/login
//(로그인 2번)
router.post('/login', async (req, res, next) => {
    // 이메일을 비교해서 존재하는 회원인지 확인
    // 비밀번호가 맞는지 확인
    let { email, password } = req.body;

    //존재하고 있는 회원인지 확인하기 위한 부분
    let checkEmail = await User.findOne({ email });

    //만약 존재하지 않는 회원이라면?
    if (!checkEmail) {
        res.json({
            status: false,
            message: "존재하지 않거나 일치하지 않는 이메일입니다."
        })
        return;
    }

    // DB에 hash형태로 password를 저장하였기 때문에,
    // 요청으로 받아온 password또한 hash형태로 변경
    let hashPassword = passwordHash(password);

    // 만약 DB에 저장되어있는 패스워드와 요청으로 받아온 패스워드가 일치하지 않으면?
    if (hashPassword !== checkEmail.password) {
        res.json({
            status: false,
            message: '비밀번호가 틀렸습니다.'
        })
        return;
    }

    // 정상적으로 로그인을 한 사람이라면?
    jwt.sign({
        email: checkEmail.email, // 이메일과 이름을 jwt로 변경해주기 위해 작성
        name: checkEmail.name
    }, jwtConfig.secret, { //jwtConfig.secret는 암호문자열임
        expiresIn: '1d'     // 기간을 줌 (1d => 하루, 1h => 한시간, 1m => 1분)
    }, (error, token) => {
        if (error) {
            //토큰을 제대로 발행하지 못하고 오류가 났을경우.
            res.status(401)
                .json({ status: false, message: "토큰 발행 실패" });
        } else {
            //정상적으로 토큰을 발행 했을경우,
            res.json({
                status: true,
                accessToken: token, //토큰 값을 브라우저에게 넘겨주는 부분
                email: checkEmail.email,
                name: checkEmail.name
            })
        }
    })

});

//http://localhost:8080/user/find?email=kevin0181@naver.com
router.get("/find", async (req, res, next) => {
    console.log(req.query);
    // 실제로 비밀번호 서비스 찾기 예:

    /*
     사용자가 이메일에해당하는 비밀번호 찾기 요청을하면
     이메일에 해당하는 사용자를 데이터베이스에서 가져오고,
     가져온 사용자의 이메일에 해당하는 데이터의 비밀번호를 랜덤값으로 할당해줌.
     할당해줬으면 그 할당한 랜덤 비밀번호를 이메일에 전송을 해줍니다.
     이메일로 전송받은 그 계정의 주인은 이메일에 있는 랜덤비밀번호를 입력해서 로그인을하고,
     나중에 패스워드 변경을 하겠죠.
    */

    //이메일을 보내줄 상대방 이메일
    let { email } = req.query;

    //이메일을 보낼 이메일
    let myEmail = 'dudspsdl123321@gmail.com';

    let transporter = nodemailer.createTransport({
        service: 'gmail', //지메일로 보낼 거니 서비스 명
        host: 'smtp.gmail.com', //지메일 서버
        port: 587, //지메일 서버 포트
        secure: false,
        auth: { //보낼 메일의 정보
            user: myEmail, 
            pass: 'itqizildvxsnhjrc' //이건 2차 비번을 활용 (원래 본인의 비밀번호를 넣어도 됩니다.)
        }
    })

    //실질적으로 이메일을 보내는 부분
    let emailInfo = await transporter.sendMail({
        from: myEmail,
        to: email,
        subject: "비밀번호 초기화 이메일",
        html: `<b>비밀번호 초기화 : sldfjslkdf </b>`
    })

    console.log(emailInfo);



})


const passwordHash = (password) => {
    return crypto.createHash("sha1").update(password).digest("hex");
}

module.exports = router;