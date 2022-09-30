$(document).ready(() => {
    //total.js를 모든 html에 등록을 했는데, html들이 로딩을 완료하는 순간
    emptyTag();

    // 로그인 성공 시, session에 저장한 회원 정보
    let email = sessionStorage.getItem("email");
    let name = sessionStorage.getItem("name");

    if (email === null && name === null) {
        //로그인을 하지 않은 상태
        loginFalse();
    } else {
        //로그인을 한 상태
        loginTrue();
    }
});

let emptyTag = () => {
    //요소 안의 버튼들을 초기화
    $("#btn-group").empty();
}

let loginTrue = () => {
    // 로그인을 한 상태에 맞는 버튼을 보여줌.
    $("#btn-group").append(`
    <button onclick="logoutBtn()" class="btn btn-outline-danger me-2">Logout</button>
    `)
}

let loginFalse = () => {
    // 로그인을 하지 않은 상태에 맞는 버튼을 보여줌
    $("#btn-group").append(`
    <a href="./../pages/login.html" class="btn btn-outline-primary me-2">Login</a>
    <a href="./../pages/signUp.html" class="btn btn-primary">Sign-up</a>
    `)
}

// 로그아웃 버튼을 클릭하게 된다면?
let logoutBtn = () => {
    // session에 저장한 회원의 정보를 삭제함.
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    location.href = "./../index.html";
}