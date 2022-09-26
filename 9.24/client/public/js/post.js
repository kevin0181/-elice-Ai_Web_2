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
                <td>${data.title}</td>
                <td>elice</td>
                <td>
                <button type="button" 
                class="btn btn-outline-warning">수정</button>
                <button type="button" 
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