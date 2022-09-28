let signUpBtn = () => {
    let { email, password, rePassword, name }
        = document.getElementById("signUpForm");
    console.log(email.value, password.value, rePassword.value, name.value)

    if (email.value === "") {
        alert("이메일을 입력해주세요.");
        return;
    }

    if (password.value === "") {
        alert("비밀번호를 입력해주세요.");
        return;
    }

    if (rePassword.value === "") {
        alert("비밀번호 확인을 입력해주세요.");
        return;
    }

    if (name.value === "") {
        alert("이름을 입력해주세요.");
        return;
    }

    if (password.value !== rePassword.value) {
        alert("비밀번호와 비밀번호 확인이 맞지 않습니다.");
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/users/signUp',
        type: 'POST',
        data: {
            email: email.value,
            password: password.value,
            name: name.value
        },
        success: (res) => {
            console.log(res);
            alert(res.message);
            location.href = "./../pages/login.html";
        },
        error: (err) => {
            console.log(err);
            if (!err.responseJSON.status) {
                alert(err.responseJSON.message);
                $("#email").val('');
                $("#password").val('');
                $("#rePassword").val('');
                $("#name").val('');
                $("#email").focus();
                return;
            }
        }
    })

}