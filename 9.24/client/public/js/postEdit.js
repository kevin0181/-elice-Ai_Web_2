$(document).ready(() => {
    if (getParameterByName("create") === "true") {
        // 게시물을 생성
        return;
    } else {
        // 게시물을 수정
    }
});

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

})



function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}