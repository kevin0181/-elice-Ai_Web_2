import { useEffect, useState } from "react";
import Create from "./Create";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

let List = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.token === undefined) {
            alert("로그인이 필요합니다.");
            navigate("/");
        }
    }, []);

    const [modalData, setModalData] = useState({
        kind: "",
        shortId: "",
        title: "",
        content: "",
        url: ""
    });

    useEffect(() => {
        console.log(modalData);
    }, [modalData]);

    let changeModalData = (e) => {
        setModalData({
            ...modalData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <main>
            <Create modalData={modalData}
                changeModalData={changeModalData} />
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Daily List</h1>
                        <p className="lead text-muted">나만의 일기장을 작성하세요.</p>
                        <div>
                            <button className="btn btn-primary"
                                data-bs-toggle="modal" onClick={() => {
                                    setModalData({
                                        ...modalData,
                                        kind: "게시글 생성"
                                    })
                                }}
                                data-bs-target="#exampleModal">일기장 생성</button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="album py-5 bg-light">
                <div className="container">

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div className="col">
                            <div className="card shadow-sm">
                                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

                                <div className="card-body">
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                        </div>
                                        <small className="text-muted">9 mins</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow-sm">
                                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

                                <div className="card-body">
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                        </div>
                                        <small className="text-muted">9 mins</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default List;