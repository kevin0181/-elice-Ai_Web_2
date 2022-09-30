// 로그인 버튼을 누르게 되면 실행되는 이벤트 핸들러 함수. (로그인 : 1번)
let loginBtn = () => {
    // 로그인 폼의 email, password의 요소를 각각 가져옴.
    let { email, password } = document.getElementById("loginForm");

    //email과 password의 값이 빈 값인지 체크 (유효성 검사) (ex : 정규식)
    if (email.value === "") {
        alert("이메일을 입력해주세요.");
        $("#email").focus();
        return;
    }

    if (password.value === "") {
        alert("비밀번호를 입력해주세요.");
        $("#password").focus();
        return;
    }

    // 서버쪽에 로그인을 요청하는 부분. (로그인 : 2번)
    $.ajax({
        url: 'http://localhost:8080/users/login',
        type: 'POST',
        data: {
            email: email.value,
            password: password.value
        },
        // 로그인 처리에 대한 응답 (로그인 : 4번)
        success: (res) => {
            // 로그인 성공한 정보를 session이라는 곳에 저장.
            sessionStorage.setItem("email", res.email);
            sessionStorage.setItem("name", res.name);
            location.href = "./../pages/post.html"
        },
        error: (err) => {
            if (!err.responseJSON.status) {
                //로그인 실패시
                alert(err.responseJSON.message);
                $("#email").val("");
                $("#email").focus();
                $("#password").val("");
                return;
            }
        }
    })
}