//post-detail.html이 로딩이 완료되면 아래 함수가 실행
$(document).ready(() => {
    //게시글의 shortId를 가져오는 부분
    let shortId = localStorage.getItem("detail-shortId");
    //shortId에 해당하는 게시글의 데이터를 서버에 요청하는 (게시글 상세보기 : 2번)
    $.ajax({
        url: `http://localhost:8080/posts/${shortId}/find`,
        type: 'GET',
        // 게시글 상세보기의 데이터를 응답 (게시글 상세보기 : 4번)
        success: (res) => {
            // title input과 content input에 value로 가져온 데이터를 넣음
            console.log(res);
            $("#title").text(res.title);
            $("#content").text(res.content);
        },
        error: (err) => {
            console.log(err);
        }
    })
});