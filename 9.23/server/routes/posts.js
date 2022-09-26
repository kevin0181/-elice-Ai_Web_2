//라우터를 사용하기 위해서 express라이브러리에 Router를 가져오고
const { Router } = require("express");
//Router 함수를 router변수에 넣음
const router = Router();

const { Post } = require("./../models")

//post 리스트를 내보냄
// http://localhost:8080/posts/
// 3. post의 list를 보내주는 부분
router.get("/", async (req, res, next) => {
    //Post 모델의 데이터를 전부 가져옴 => find.
    const posts = await Post.find({});
    // posts는 json 형태이므로 json형태로 응답을 해줌.
    res.json(posts);
});

//post를 작성하는 부분
// http://localhost:8080/posts/
router.post("/", async (req, res, next) => {

    let { title, content } = req.body;
    console.log(req.body);

    try {

        await Post.create({
            title,
            content
        });

        res.json({ message: "저장이 완료되었습니다." });

    } catch (e) {
        next(e);
    }

});

//posts삭제
//http:localhost:8080/posts/1/delete
router.get("/:id/delete", async (req, res, next) => {
    let { id } = req.params;

    try {

        await Post.findByIdAndDelete(id);

        res.json({ message: "삭제를 성공하였습니다." });
    } catch (e) {
        next(e);
    }

});

//post 찾기
// GET http://localhost:8080/posts/1/find
router.get("/:id/find", async (req, res, next) => {
    let { id } = req.params;
    try {
        let post = await Post.findById(id);
        res.json(post);
    } catch (e) {
        next(e);
    }
})



//post 수정
//http://localhost:8080/posts/:id/update
router.post("/:id/update", async (req, res, next) => {

    // http://localhost:8080/posts/632c00148a165838f2d77df7/update

    let { id } = req.params;

    let { title, content } = req.body;

    try {

        await Post.findByIdAndUpdate(id, {
            title,
            content
        });

        res.json({ message: "수정을 성공하였습니다." });

    } catch (e) {
        next(e);
    }

})



module.exports = router;