// document ready
// localstorage 를 통해서 detail-id값 가져오고
// ajax로 shortid값에 해당하는 게시글을 가져오고
// console.log(res);

$(document).ready(() => {
    let shortId = localStorage.getItem("detail-shortId");

    $.ajax({
        url: `http://localhost:8080/posts/${shortId}/find`,
        type: 'GET',
        success: (res) => {
            console.log(res);
            $("#title").text(res.title);
            $("#content").text(res.content);
        },
        error: (err) => {
            console.log(err);
        }
    })
});