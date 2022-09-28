$(document).ready(() => {
    if (getParameterByName("create") === "true") {
        // 게시물을 생성
        createPostEditBtn();
    } else {
        // 게시물을 수정
        updatePostEditBtn();
        getUpdatePost(getParameterByName("shortId"));
    }

    $("#create-post-btn").on('click', () => {
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


        $.ajax({
            url: "http://localhost:8080/posts",
            type: "POST",
            data: {
                title, content
            },
            success: (res) => {
                if (res.status) {
                    alert(res.message);
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


    $("#update-post-btn").on('click', () => {

        let shortId = getParameterByName("shortId");

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

        $.ajax({
            url: `http://localhost:8080/posts/${shortId}/update`,
            type: 'POST',
            data: {
                title, content
            },
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



let createPostEditBtn = () => {
    $("#post-edit-group").empty();
    $("#post-edit-group").append(
        `<button class="btn btn-outline-primary me-2" id="create-post-btn">생성</button>
        <button class="btn btn-outline-danger" onclick="history.back()" id="cancel-post-btn">취소</button>`
    );
}

let updatePostEditBtn = () => {
    $("#post-edit-group").empty();
    $("#post-edit-group").append(
        `<button class="btn btn-outline-warning me-2" id="update-post-btn">수정</button>
        <button class="btn btn-outline-danger" onclick="history.back()" id="cancel-post-btn">취소</button>`
    );
}

let getUpdatePost = (shortId) => {
    $.ajax({
        url: `http://localhost:8080/posts/${shortId}/find`,
        type: 'GET',
        success: (res) => {
            console.log(res);
            $("#title").val(res.title);
            $("#content").val(res.content);
        },
        error: (err) => {
            console.log(err);
        }
    })
}


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}