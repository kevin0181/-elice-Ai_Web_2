$(document).ready(() => {
    getPostList();
});
// get post list
let getPostList = () => {
    $.ajax({
        url: "http://localhost:8080/posts",
        type: "GET",
        success: (res) => {
            console.log(res);

            let str = '';

            res.map((data, index) => {
                str += ` 
                <tr>
                <th scope="row">${index + 1}</th>
                <td onclick="postDetailBtn('${data.shortId}')">${data.title}</td>
                <td>elice</td>
                <td>
                <button type="button" 
                class="btn btn-outline-warning"
                onclick="postEditbtn('${data.shortId}')"
                >수정</button>
                <button type="button" onclick="saveDeleteId('${data.shortId}')"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                class="btn btn-outline-danger">삭제</button>
                </td>
                </tr>`;
            });

            $("#post-tbody").append(str);

        },
        error: (err) => {
            console.log(err);
        }
    })
}

let saveDeleteId = (shortId) => {
    localStorage.setItem("delete-shortId", shortId)
}
let deletePostBtn = () => {
    let shortId = localStorage.getItem("delete-shortId");
    localStorage.removeItem("delete-shortId");

    $.ajax({
        url: `http://localhost:8080/posts/${shortId}/delete`,
        type: 'GET',
        success: (res) => {
            console.log(res);
            alert(res.message);
            location.reload();
        },
        error: (err) => {
            console.log(err);
        }
    })
}

let postEditbtn = (shortId) => {
    location.href = `./../pages/post-edit.html?create=false&shortId=${shortId}`
}

let postDetailBtn = (shortId) => {
    localStorage.setItem("detail-shortId", shortId);
    location.href="./../pages/post-detail.html";
}