const { Router } = require("express");
const router = Router();
const { Daily } = require("./../../models");
const { User } = require("./../../models");

//일기장 생성
//http://localhost:8080/daily/ 
router.post("/", async (req, res, next) => {
    console.log(req.body);
    let { title, content, url, email } = req.body;

    try {

        //일기장 생성하기전에 작성자를 같이 담아주기 위해서 email에 맞는 정보를 가지고 있는,
        // 회원의 데이터를 가져옴
        const authData = await User.findOne({ email });

        //회원의 정보와 함께 저장함
        await Daily.create({
            title,
            content,
            url,
            author: authData
        })

        res.json({
            status: true,
            message: "일기장을 생성하였습니다."
        })

    } catch (e) {
        next(e);
    }

});

//게시글 리스트 가져오기
//http://localhost:8080/daily
router.get("/", async (req, res, next) => {

    //일기장을 생성한 회원의 정보와함께 리스트를 가져옴
    let daily = await Daily.find({}).populate('author');

    res.json({ daily });

});

//게시글 수정
//http://localhost:8080/daily/shortId/update
router.post("/:shortId/update", async (req, res, next) => {
    let { shortId } = req.params;
    let { title, content, url } = req.body;

    try {

        //shortId에 해당하는 게시글의 정보를 수정함
        await Daily.updateOne({ shortId }, {
            title,
            content,
            url
        });

        res.json({
            status: true,
            message: "일기장을 수정하였습니다."
        })

    } catch (e) {
        next(e);
    }

});

//일기장 삭제
//http://localhost:8080/daily/shortId/delete
router.post("/:shortId/delete", async (req, res, next) => {
    let { shortId } = req.params;
    try {

        //shortId에 해당하는 일기장을 삭제함.
        await Daily.deleteOne({ shortId });

        res.json({
            status: true,
            message: "일기장을 삭제하였습니다."
        });

    } catch (e) {
        next(e);
    }
})



module.exports = router;