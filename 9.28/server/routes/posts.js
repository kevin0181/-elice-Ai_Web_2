const { Router } = require("express");
const router = Router();

const { Post } = require('./../models');

// post list
router.get("/", async (req, res, next) => {
    res.json(await Post.find({}));
})

// post create
router.post('/', async (req, res, next) => {
    const { title, content } = req.body;
    try {
        await Post.create({
            title,
            content,
        });
        res.json({
            message: "게시글 작성이 완료되었습니다.",
            status: true
        });
    } catch (err) {
        next(err);
    }
});
// post find
router.get("/:shortId/find", async (req, res, next) => {
    let { shortId } = req.params;
    try {
        let post = await Post.findOne({ shortId });
        res.json(post);
    } catch (e) {
        next(e);
    }
});

//post update
router.post("/:shortId/update", async (req, res, next) => {
    let { shortId } = req.params;
    let { title, content } = req.body;

    try {

        await Post.updateOne({ shortId }, {
            title, content
        });

        res.json({
            message: '게시글 수정이 완료되었습니다.',
            status: true
        });

    } catch (e) {
        next(e);
    }
})

// post delete
router.get("/:shortId/delete", async (req, res, next) => {
    let { shortId } = req.params;
    try {
        await Post.deleteOne({ shortId });

        res.json({
            message: "게시글을 삭제하였습니다.",
            status: true
        })

    } catch (e) {
        next(e);
    }

});




module.exports = router;