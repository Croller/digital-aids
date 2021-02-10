const router = require("express").Router()
const AuthService = require("../../services/restaurants")
const Service = require("../../services/restaurants")
// after this point only authorized users are allowed
// router.use( AuthService.tokenMiddleware )

router.get("/:slug/:lang", async (req, res) => {
    const {slug, lang} = req.params
    const result = await Service.get(slug, lang)
    if( result )
        res.json(result)
    else
        res.sendStatus(404)
    // res.send("Fetching data for restaurant " + slug );
})

router.post("/clear-cache", async(req, res) => {
    Service.clearCache()
    res.send("OK")
})

module.exports = router