// post.html이 로딩이 완료되면?
$(document).ready(() => {
    getPostList();
});

// get post list
// 게시글의 리스트를 가져오는 함수 (게시글 가져오기 : 1번)
let getPostList = () => {
    // 서버에 있는 게시글을 가져오기 위해서 url에 요청 (게시글 가져오기 : 2번)
    $.ajax({
        url: "http://localhost:8080/posts",
        type: "GET",
        // 요청에 따른 게시글의 리스트를 가져오는 부분 (게시글 가져오기 : 4번)
        success: (res) => {
            console.log(res);

            // str이라는 변수에 모든 요소를 담은 후 append를 시켜주기위해서
            let str = '';

            // 응답받은 데이터 (res)가 배열이기때문에 map함수를 사용
            // res.map((data = 배열의 현재 요소, index = 배열의 현재 인덱스))
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

            // 요소로 이루어진 문자열을 tbody에 추가
            $("#post-tbody").append(str);

        },
        error: (err) => {
            console.log(err);
        }
    })
}
// 삭제 버튼을 클릭 했을때 이벤트 핸들러 함수, (게시글 삭제 : 1번)
let saveDeleteId = (shortId) => {
    // 인자로 받아온 shortId를 localStorage에 저장
    localStorage.setItem("delete-shortId", shortId)
}

// 모달창의 삭제 버튼의 이벤트 핸들러 함수 (게시글 삭제 : 2번)
let deletePostBtn = () => {

    // localStorage에 저장되어있는 shortId를 가져오는 부분.
    let shortId = localStorage.getItem("delete-shortId");
    // 가져온 후 지워주는 부분.
    localStorage.removeItem("delete-shortId");

    // shortId를 서버에 보내서 삭제를 요청 (게시글 삭제 : 3번)
    $.ajax({
        url: `http://localhost:8080/posts/${shortId}/delete`,
        type: 'GET',
        // 게시글 삭제 요청에 대한 응답 (게시글 삭제 : 5번)
        success: (res) => {
            console.log(res);
            //삭제가 완료 되었다면, 완료 메시지를 알림창으로 보여준 뒤,
            alert(res.message);
            //해당 페이지를 reload
            location.reload();
        },
        error: (err) => {
            console.log(err);
        }
    })
}

// 수정을 하기 위해 수정페이지로 이동을 하는 부분 (게시글 수정 : 1번)
let postEditbtn = (shortId) => {
    location.href = `./../pages/post-edit.html?create=false&shortId=${shortId}`
}
// 게시글의 상세보기 페이지로 이동하는 부분 (게시글 상세보기 : 1번)
let postDetailBtn = (shortId) => {
    //상세보기 페이지에 shortId를 알려주기위해서 localStorage에 저장
    localStorage.setItem("detail-shortId", shortId);
    location.href = "./../pages/post-detail.html";
}