import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import kakaoLogin from "./../img/kakao_login_medium.png";

let Home = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    // 로그인 폼이나 회원가입 폼을 버튼 누름에 따라 보여주는 부분
    const [status, setStatus] = useState({
        login: false,
        signUp: false
    });

    const navigate = useNavigate();

    //처음 렌더링이 되었을 경우, 쿠키의 값을 확인,
    // 만약 쿠키가 비워져있지 않다면 (즉, 로그인 되어있는 상태)
    // 일기장 리스트 페이지로 이동시킴
    useEffect(() => {
        console.log(cookies);
        if (cookies.token !== undefined) {
            navigate("/daily/list");
        }
    }, []);

    //소셜 로그인 : 1번
    // rest api와 redirect uri를 *꼭* 넣어서 (카카오 소셜인증) 서버에 요청을합니다.
    // 요 부분이 이제 사용자의 카카오계정을 저희쪽 애플리케이션에 추가를 하는 과정이예요.
    // 즉, 인가 코드 요청 부분
    let REST_API_KEY = '1209356b643009144e11fa7f41f29469';
    let REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
    let KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <main>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Album example</h1>
                        <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                        <p>
                            <button onClick={() => {
                                setStatus({
                                    login: true,
                                    signUp: false
                                })
                            }}
                                className="btn btn-primary my-2 m-1">로그인</button>
                            <button onClick={() => {
                                setStatus({
                                    login: false,
                                    signUp: true
                                })
                            }} className="btn btn-secondary my-2 m-1">회원가입</button>
                            <a href={KAKAO_AUTH_URL}>
                                <img src={kakaoLogin} />
                            </a>
                        </p>
                    </div>
                </div>
            </section>
            <div className={"container"}>
                {
                    status.signUp === true ? (<SignUp />) : (<></>)
                }
                {
                    status.login === true ? (<SignIn />) : (<></>)
                }
            </div>
        </main>
    )
}

export default Home;
