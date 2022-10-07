import { useEffect, useState } from "react";
import axios from "axios";
import server from "./../../config/server.json";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

let SignIn = () => {

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const [signInData, setSignInData] = useState({
        email: "",
        password: ""
    });

    let changeSignInData = (e) => {
        // e => element  요소 그자체를 가져온거, 요소는 input 
        setSignInData({
            ...signInData,
            [e.target.name]: e.target.value
        });
    }

    let clickLoginBtn = async () => {
        if (signInData.email === "") {
            alert("이메일을 입력해주세요.");
            return;
        }
        if (signInData.password === "") {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        return await
            axios.post(server.url + "/user/login", signInData);
    }

    const [errorMsg, setErrorMsg] = useState("");

    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">이메일</label>
                    <input type="email" value={signInData.email} onChange={changeSignInData} className="form-control" name={"email"} id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">비밀번호</label>
                    <input type="password" value={signInData.password} onChange={changeSignInData} className="form-control" name="password" id="password" />
                </div>
                <div className="mb-3">
                    <p className="text-danger">{errorMsg}</p>
                </div>
                <button type="button" onClick={() => {
                    clickLoginBtn().then(res => {
                        console.log(res);
                        if (res.data.status) {
                            //로그인 성공
                            setCookie("token", res.data, { path: "/" });
                            navigate('/daily/list');
                        } else {
                            //로그인 실패
                            setErrorMsg(res.data.message);
                        }

                    }).catch(err => {
                        console.log(err);
                    })
                }}
                    className="btn btn-primary">로그인</button>
            </form>
        </>
    )
}

export default SignIn;