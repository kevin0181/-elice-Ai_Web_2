//post-Edit.html이 로딩이 완료가 되는 순간.
$(document).ready(() => {

    // create가 true면 게시글 생성, false면 게시글 수정
    if (getParameterByName("create") === "true") {
        // 게시물을 생성 (게시글 생성 : 1번)
        createPostEditBtn();
    } else {
        // 게시물을 수정 (게시글 수정 : 2번)
        updatePostEditBtn();
        getUpdatePost(getParameterByName("shortId"));
    }

    //생성 버튼을 클릭 했을때의 이벤트 핸들러 함수 (게시글 생성 : 2번)
    $("#create-post-btn").on('click', () => {

        // title, content의 value값을 가져와줌.
        let title = $("#title").val();
        let content = $("#content").val();

        if (title === "") {
            alert("제목을 입력해주세요.");
            return;
        }

        if (content === "") {
            alert("내용을 입력해주세요.");
            return;
        }

        // 서버에 게시글을 생성하기 위한 요청을 보냄. (게시글 생성 : 3번)
        $.ajax({
            url: "http://localhost:8080/posts",
            type: "POST",
            data: {
                title, content
            },
            // 게시글 생성 요청에 대한 응답 (게시글 생성 : 5번)
            success: (res) => {
                if (res.status) {
                    // 성공 메시지
                    alert(res.message);
                    // 게시글 리스트 페이지로 리다이렉트
                    location.href = "./post.html";
                } else {
                    alert(res.error);
                    location.reload();
                }
            },
            error: (err) => {
                console.log(err);
            }
        })

    });

    // 실질적으로 수정을 한 뒤, 수정 버튼을 통해서 수정을 하는곳 
    // (게시글 수정 : 6번)
    $("#update-post-btn").on('click', () => {

        //현재 게시글의 shortId를 가져오는 부분.
        let shortId = getParameterByName("shortId");

        //title과 content의 현재 value값을 가져오는 부분.
        let title = $("#title").val();
        let content = $("#content").val();

        if (title === "") {
            alert("제목을 입력해주세요.");
            return;
        }

        if (content === "") {
            alert("내용을 입력해주세요.");
            return;
        }

        // 수정한 데이터를 서버에 전송을 해주는 부분 (게시글 수정 : 7번)
        $.ajax({
            url: `http://localhost:8080/posts/${shortId}/update`,
            type: 'POST',
            data: {
                title, content
            },
            //수정 요청에 대한 응답 (게시글 수정 : 9번)
            success: (res) => {
                console.log(res);
                alert(res.message);
                location.href = "./post.html";
            },
            error: (err) => {
                console.log(err);
            }
        })

    });

});


//생성 페이지로 접근을 하게 되면, 생성 버튼을 보여주는 함수.
let createPostEditBtn = () => {
    $("#post-edit-group").empty();
    $("#post-edit-group").append(
        `<button class="btn btn-outline-primary me-2" id="create-post-btn">생성</button>
        <button class="btn btn-outline-danger" onclick="history.back()" id="cancel-post-btn">취소</button>`
    );
}

// 수정 페이지로 접근을 하게 되면, 수정 버튼을 보여주는 함수.
let updatePostEditBtn = () => {
    $("#post-edit-group").empty();
    $("#post-edit-group").append(
        `<button class="btn btn-outline-warning me-2" id="update-post-btn">수정</button>
        <button class="btn btn-outline-danger" onclick="history.back()" id="cancel-post-btn">취소</button>`
    );
}

// 실질적으로 수정하기 전 데이터를 가져오는 부분
let getUpdatePost = (shortId) => {

    // shortId에 해당하는 게시글을 찾기 위해 서버에 요청하는 부분. 
    // (게시글 수정 : 3번)
    $.ajax({
        url: `http://localhost:8080/posts/${shortId}/find`,
        type: 'GET',
        // 게시글 찾는 요청에 대한 응답 (게시글 수정 : 5번)
        success: (res) => {
            console.log(res);
            // 각 input의 value에 제목과 내용을 넣어줌.
            $("#title").val(res.title);
            $("#content").val(res.content);
        },
        error: (err) => {
            console.log(err);
        }
    })
}


// 함수안에 key값을 인자로 넣어주면, 현재 url의 key에 해당하는 value를 반환해주는 함수
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}