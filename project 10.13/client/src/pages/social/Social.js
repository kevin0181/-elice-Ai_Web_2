import { useEffect } from "react";
import axios from "axios";
import server from "./../../config/server.json";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

let Social = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    // 소셜 로그인 : 2번
    // 인가코드를 요청해서 받는 부분.
    // 인가 코드가 code라는 곳의 value로 존재하니깐 그걸 꺼내와서 KAKAO_CODE에 담아주는 부분입니다.
    let KAKAO_CODE = new URL(window.location.href)
        .searchParams.get("code");

    useEffect(() => {
        console.log(KAKAO_CODE);

        //소셜 로그인 : 3번
        //인가코드를 가져왔으면 저희 서버(express)에 인가 코드를 보내줘서,
        // 서버쪽에서 카카오 서버쪽에 토큰을 요청해야합니다. 그래서
        // 인가코드를 저희 서버에 보내주는 부분
        axios.get(server.url + "/oauth/kakao/server", {
            params: {
                kakaoCode: KAKAO_CODE
            }
        }).then(res => {
            //소셜 로그인 : 8번
            console.log(res);
            // 저희쪽 jwt토큰으로 발급한걸 쿠키에 저장후 리스트페이지로 리다이렉트
            setCookie("token", res.data, { path: "/" });
            navigate("/daily/list");
        });


    }, []);
}

export default Social;