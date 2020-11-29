const router = require("express").Router()
const Service = require("../../services/translation")

router.get("/", (req,res)=> res.send("Translations OK"))

router.get("/:slug/languages", async (req, res) => {
    const {slug } = req.params
    const result = await Service.languagesByRestaurant(slug)
    res.json(result)
})

router.get("/:lang/:default_lang?", async (req, res) => {
    const {lang, default_lang} = req.params

    const {keys} = req.query
    
    const result = await Service.getByKeys(keys, lang, default_lang)
    // console.debug("Translation result:", result)
    if( result)
        res.json(result)
    else
        res.status(404).send(Service.error )
})

router.post("/clear-cache", async(req, res) => {
    Service.clearCache()
    res.send("OK")
})

router.post("/show-cache", async(req, res) => {
    res.json(Service._CACHE);
})

module.exports = router