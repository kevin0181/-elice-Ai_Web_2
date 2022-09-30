$(document).ready(() => {

    emptyTag();

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
    // 로그인을 한 상태
    $("#btn-group").append(`
    <button onclick="logoutBtn()" class="btn btn-outline-danger me-2">Logout</button>
    `)
}

let loginFalse = () => {
    // 로그인을 하지 않은 상태
    $("#btn-group").append(`
    <a href="./pages/login.html" class="btn btn-outline-primary me-2">Login</a>
    <a href="./pages/signUp.html" class="btn btn-primary">Sign-up</a>
    `)
}

let logoutBtn = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    location.href = "./index.html";
}