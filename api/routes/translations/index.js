const router = require("express").Router()
const Service = require("../../services/translation")

router.get("/", (req,res)=> res.send("Translations OK"))

router.get("/:slug/languages", async (req, res) => {
    const {slug } = req.params
    const result = await Service.languagesByRestaurant(slug)
    res.json(result)
})

router.post("/clear-cache", async(req, res) => {
    Service.clearCache()
    res.send("OK")
})

module.exports = router