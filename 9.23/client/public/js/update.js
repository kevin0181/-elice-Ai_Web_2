$(document).ready(() => {
    let id = localStorage.getItem("post-id");

    $.ajax({
        url: `http://localhost:8080/posts/${id}/find`,
        type: "GET",
        success: (res) => {
            console.log(res);
            $("#title").val(res.title);
            $("#content").val(res.content);
        },
        error: (e) => {
            console.log(e);
        }
    });

    $("#update-btn").on('click', () => {

        if ($("#title").val() === "") {
            alert("제목을 입력하세요.");
            return;
        }

        if ($("#content").val() === "") {
            alert("내용을 입력해주세요.");
            return;
        }

        console.log($("#update-form").serialize());

        $.ajax({
            url: `http://localhost:8080/posts/${id}/update`,
            type: "POST",
            data: $("#update-form").serialize(),
            success: (res) => {
                console.log(res);
                alert(res.message);
                location.href = './../index.html';
            },
            error: (e) => {
                console.log(e)
            }
        })

    });

});

