let postForm = document.getElementById("create-form");

let createPost = () => { //이벤트 핸들러

    if (postForm.title.value === "") {
        alert("제목을 입력해주세요.");
        return;
    }

    if (postForm.content.value === "") {
        alert("내용을 입력해주세요.");
        return;
    }

    console.log(postForm.title.value, postForm.content.value);

    //post 저장하는 url
    //POST http://localhost:8080/posts/
    $.ajax({
        url: `http://localhost:8080/posts`,
        type: "POST",
        dataType: "JSON",
        data: {
            title: postForm.title.value,
            content: postForm.content.value
        },
        success: (res) => {
            console.log(res);
            alert(res.message);
            location.href = './../index.html';
        },
        error: (e) => {
            console.log(e);
        }
    })


}