//회원가입 버튼을 눌렀을때 동작을하는 이벤트 핸들러 함수 : (회원가입 1번)
let signUpBtn = () => {
    // form 의 name이 같은 변수명에다가 요소를 각각 넣어줌.
    let { email, password, rePassword, name }
        = document.getElementById("signUpForm");

    // 각 input의 value를 빈 값인지 검사하는 부분 (유효성 검사)
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

    // 비밀번호와 비밀번호 확인이 일치하는지 확인하는 부분.
    if (password.value !== rePassword.value) {
        alert("비밀번호와 비밀번호 확인이 맞지 않습니다.");
        return;
    }

    //회원의 정보를 가져와서 서버에 요청을 하는 부분 (jquery의 ajax를 사용해서) 
    //  (회원가입 : 2번)
    $.ajax({
        // 경로 -> 서버에 어떤 경로로 요청을 할건지
        url: 'http://localhost:8080/users/signUp',
        // http의 요청 메서드 타입
        // 회원들의 정보를 숨겨서 요청을 보내야하니깐 post방식을 사용해서 body안에 숨겨서 전송
        type: 'POST',
        // 회원의 정보를 담아서 보내는 부분
        data: {
            email: email.value,
            password: password.value,
            name: name.value
        },
        // 요청에 대한 응답을 처리하는 부분 (회원가입 : 4번)
        success: (res) => {
            // 응답에 성공을 했다면?
            console.log(res);
            // 성공했다면 res안에 있는 message를 알림창으로 보여주고,
            alert(res.message);
            // 로그인 페이지로 리다이렉트
            location.href = "./../pages/login.html";
        },
        error: (err) => {
            // 응답에 실패 했다면?
            console.log(err);
            if (!err.responseJSON.status) {
                // err status가 false면?
                // err message를 알림창으로 보여주고
                alert(err.responseJSON.message);
                // 모든 input의 value를 빈 값으로 변경 후,
                $("#email").val('');
                $("#password").val('');
                $("#rePassword").val('');
                $("#name").val('');
                // email에 focus를 줌.
                $("#email").focus();
                return;
            }
        }
    })

}