$(document).ready(() => { // <= 1. index.html이 로딩이 되면 실행

    getPostList();

});

//post의 리스트를 가져오는 함수
let getPostList = () => {

    $("#table-id").empty();

    // 2. ajax를 통해서 서버에 posts의 list를 요청하는 부분
    $.ajax({
        url: `http://localhost:8080/posts`,
        type: "GET",
        success: (res) => {
            // 4. posts의 list를 응답 받음.
            console.log(res);

            res.map((data, index) => {

                $("#table-id").append(`
            <tr>
                <th scope="row">${index + 1}</th>
                <td>
                    <p onclick="detailBtn('${data._id}')">
                    ${data.title}</p>
                </td>
                <td>
                    <button type="button" 
                    onclick="updateBtn('${data._id}')"
                    class="btn btn-outline-warning">
                        수정
                    </button>
                </td>
                <td>
                    <button type="button" 
                     onclick="deletePost('${data._id}')"
                     class="btn btn-outline-danger">
                        삭제
                     </button>
                </td>
            </tr>
            `)

            })

        },
        error: (e) => {
            console.log(e);
        }
    })
}
// 아이디를 저장해야되고 (크롬), 페이지를 이동해야되고, 
let detailBtn = (id) => {
    localStorage.setItem('post-id', id);
    location.href = './pages/detail.html';
}

// 수정 버튼을 눌렀을때, 이벤트 핸들러
let updateBtn = (id) => {
    localStorage.setItem('post-id', id);
    location.href = './pages/update.html';
}

//post를 삭제하는 함수
let deletePost = (id) => {
    if (window.confirm("게시글 삭제 하시겠습니까?")) {
        //true 확인버튼

        //GET http://localhost:8080/posts/${id}/delete
        $.ajax({
            url: `http://localhost:8080/posts/${id}/delete`,
            type: "GET",
            success: (res) => {
                console.log(res);
                alert(res.message);
                getPostList();
            },
            error: (e) => {
                console.log(e);
            }

        })

    }
}
