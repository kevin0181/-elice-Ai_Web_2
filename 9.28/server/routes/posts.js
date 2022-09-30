const { Router } = require("express");
const router = Router();

const { Post } = require('./../models');

// post list
// http://localhost:8080/posts/ GET (게시글 가져오기 : 3번)
router.get("/", async (req, res, next) => {
    //게시글 리스트를 DB에서 가져와서 가져온 게시글 데이터를 응답.
    res.json(await Post.find({}));
})

// post create
// http://localhost:8080/posts/ POST (게시글 생성 : 4번)
router.post('/', async (req, res, next) => {
    // body에서 title과 content를 가져옵니다.
    const { title, content } = req.body;
    try {

        // title과 content를 저장하는 부분.
        await Post.create({
            title,
            content,
        });
        // 저장이 되었으면 작성 완료 메시지를 응답
        res.json({
            message: "게시글 작성이 완료되었습니다.",
            status: true
        });
    } catch (err) {
        next(err);
    }
});

// post find
// http://localhost:8080/posts/1/find  
// (게시글 수정 : 4번, 게시글 상세보기 : 3번)
router.get("/:shortId/find", async (req, res, next) => {
    // 파라미터에서 shortId를 가져옴.
    let { shortId } = req.params;
    try {
        // shortId에 해당하는 게시글의 데이터를 가져옴.
        let post = await Post.findOne({ shortId });
        // 가져온 데이터를 응답.
        res.json(post);
    } catch (e) {
        next(e);
    }
});

//post update
// http://localhost:8080/posts/1/update (게시글 수정 : 8번)
router.post("/:shortId/update", async (req, res, next) => {
    // 게시글의 shortId를 가져오고,
    let { shortId } = req.params;
    // body에 있는 수정할 데이터 title, content를 가져옵니다.
    let { title, content } = req.body;

    try {

        //가져온 데이터의 shortId에 해당하는 게시글에 title과 content를 수정.
        await Post.updateOne({ shortId }, {
            title, content
        });

        //수정을 완료했다는 응답.
        res.json({
            message: '게시글 수정이 완료되었습니다.',
            status: true
        });

    } catch (e) {
        next(e);
    }
})

// post delete
// http://localhost:8080/posts/1/delete (게시글 삭제 : 4번)
router.get("/:shortId/delete", async (req, res, next) => {
    // 게시글을 삭제하기 위한 shortId를 가져옴.
    let { shortId } = req.params;
    try {
        // DB에서 shortId가 같은 게시글의 데이터를 삭제
        await Post.deleteOne({ shortId });
        // 삭제가 완료되었다는 메시지를 응답.
        res.json({
            message: "게시글을 삭제하였습니다.",
            status: true
        })

    } catch (e) {
        next(e);
    }

});




module.exports = router;