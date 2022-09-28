let loginBtn = () => {
    let { email, password } = document.getElementById("loginForm");

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

    $.ajax({
        url: 'http://localhost:8080/users/login',
        type: 'POST',
        data: {
            email: email.value,
            password: password.value
        },
        success: (res) => {
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