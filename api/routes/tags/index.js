const router = require("express").Router()
const Service = require("../../services/tags")

router.get("/", (req,res)=> res.send("Tags OK") )
router.get("/all/:slug/:lang/:default_lang", async (req, res) => {
    const {slug, lang = "en", default_lang = "en" } = req.params
    const result = await Service.getAll(slug, lang, default_lang )
    res.json(result)
})

router.post("/clear-cache", async(req, res) => {
    Service.clearCache()
    res.send("OK")
})

module.exports = router