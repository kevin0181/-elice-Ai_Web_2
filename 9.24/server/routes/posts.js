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



module.exports = router;