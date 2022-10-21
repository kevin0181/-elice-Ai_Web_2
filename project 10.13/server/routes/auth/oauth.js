const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { User } = require("./../../models");
const jwt = require("jsonwebtoken");
const jwtConfig = require("./../../config/jwtConfig");

// 소셜 로그인 : 4번
// 클라이언트 쪽에서 인가코드를 정상적으로 발급했다면?
// 서버쪽으로 가져와서 이 인가코드를 가지고 카카오서버에 요청해서 토큰으로 발급을 해주는 부분입니다.
router.get("/kakao/server", async (req, res, next) => {

    // 똑같이 rest api key와 redirect uri를 가져옵니다.
    let REST_API_KEY = '1209356b643009144e11fa7f41f29469';
    let REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
    // 클라이언트에서 보낸 인가 코드를 가져옵니다.
    let CODE = req.query.kakaoCode;

    // 카카오 서버쪽에 인가코드를 포함해서 요청하여,
    // 토큰으로 발급을 받습니다.
    await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${CODE}`, {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }).then(data => {
        //소셜 로그인 : 5번
        // 정상적으로 토큰을 발급하였다면?
        // 토큰을 가지고 사용자의 정보를 가져와줍니다.
        getKakaoUserInfo(data.data.access_token)
            .then(userInfo => {
                // 소셜 로그인 : 6번
                // 정상적으로 사용자의 정보를 가져왔다면?
                // 사용자의 정보를 저희쪽 DB에다가 저장을 해주는 부분 or 로그인 해주는 부분
                checkEmailSocial(userInfo.data, res);
            })
    })
})

// 소셜 로그인 : 6번
// 토큰을 가지고 사용자의 정보를 가져와주는 부분입니다.
// 사용자의 정보 = 카카오톡 서버에서 사용하는 사용자의 정보
const getKakaoUserInfo = async (accessToken) => {
    return await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
}

// 소셜 로그인 : 7번
// 사용자의 정보를 가져왔으니,
// 이미 소셜로그인으로 한번이라도 접근을해서 회원가입을 했던 사람이라면?
// 그냥 바로 로그인 처리, 그게 아니라면 회원가입을 시켜주고 로그인처리.
const checkEmailSocial = async (socialInfo, res) => {

    //요 부분은 혹시나 사용자가 이메일을 선택하지 않고 로그인을
    // 했을경우를 방지하기위해 작성했습니다.
    if (socialInfo.kakao_account.email === undefined) {
        res.json({
            error: true,
            message: "존재하지 않는 소셜 이메일",
            status: false
        })
        return;
    }

    //이미 회원가입이 되어있는 회원인지 확인하기 위해 저희쪽 DB를 조회
    const checkEmail = await User.findOne({
        email: socialInfo.kakao_account.email
    });

    if (checkEmail) {
        //이미 회원가입이 되어있는 상태 (즉, 한번이라도 소셜로그인을 한 상태)
        jwt.sign({
            email: checkEmail.email, // 이메일과 이름을 jwt로 변경해주기 위해 작성
            name: checkEmail.name
        }, jwtConfig.secret, { //jwtConfig.secret는 암호문자열임
            expiresIn: '1d'     // 기간을 줌 (1d => 하루, 1h => 한시간, 1m => 1분)
        }, (error, token) => {
            console.log(token);
            if (error) {
                //토큰을 제대로 발행하지 못하고 오류가 났을경우.
                res.status(401)
                    .json({ status: false, message: "토큰 발행 실패", error: true });
            } else {
                //정상적으로 토큰을 발행 했을경우,
                res.json({
                    status: true,
                    accessToken: token, //토큰 값을 브라우저에게 넘겨주는 부분
                    email: checkEmail.email,
                    name: checkEmail.name,
                    social: true,
                    error: false,
                    message: "소셜 로그인 성공"
                })
            }
        })


    } else {
        //회원가입이 되지 않은 상태 (즉, 처음으로 접근해 소셜로그인을 한 사람)

        // 회원가입을 시켜주고. (카카오에서 받은 정보로)
        await User.create({
            email: socialInfo.kakao_account.email,
            password: "",
            name: socialInfo.properties.nickname
        });

        //다시 한번 정상적으로 DB에 저장되었는지 확인하기위해서 회원 호출
        const checkEmail = await User.findOne({
            email: socialInfo.kakao_account.email
        });

        if (checkEmail) {
            //회원이 잘 저장되었다면?
            // 로그인을 진행시켜줌
            jwt.sign({
                email: checkEmail.email, // 이메일과 이름을 jwt로 변경해주기 위해 작성
                name: checkEmail.name
            }, jwtConfig.secret, { //jwtConfig.secret는 암호문자열임
                expiresIn: '1d'     // 기간을 줌 (1d => 하루, 1h => 한시간, 1m => 1분)
            }, (error, token) => {
                if (error) {
                    //토큰을 제대로 발행하지 못하고 오류가 났을경우.
                    res.status(401)
                        .json({ status: false, message: "토큰 발행 실패", error: true });
                } else {
                    //정상적으로 토큰을 발행 했을경우,
                    res.json({
                        status: true,
                        accessToken: token, //토큰 값을 브라우저에게 넘겨주는 부분
                        email: checkEmail.email,
                        name: checkEmail.name,
                        social: true,
                        error: false,
                        message: "소셜 로그인 성공"
                    })
                }
            });
            return;
        }
        res.status(500).json({
            error: true,
            message: "정상적이지 않은 접근입니다."
        });
    }
}


module.exports = router;