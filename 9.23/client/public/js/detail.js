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
})