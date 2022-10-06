import SignUp from "./user/SignUp";
import { useState } from "react";

let Home = () => {

    // 로그인 폼이나 회원가입 폼을 버튼 누름에 따라 보여주는 부분
    const [status, setStatus] = useState({
        login: false,
        signUp: false
    });

    return (
        <main>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Album example</h1>
                        <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                        <p>
                            <button className="btn btn-primary my-2 m-1">로그인</button>
                            <button onClick={() => {
                                setStatus({
                                    login: false,
                                    signUp: true
                                })
                            }} className="btn btn-secondary my-2 m-1">회원가입</button>
                        </p>
                    </div>
                </div>
            </section>
            <div className={"container"}>
                {
                    status.signUp === true ? (<SignUp />) : (<></>)
                }
            </div>
        </main>
    )
}

export default Home;
