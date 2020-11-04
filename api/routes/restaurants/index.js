const router = require("express").Router()
const AuthService = require("../../services/restaurants")

// after this point only authorized users are allowed
// router.use( AuthService.tokenMiddleware )

router.get("/:slug", async (req, res) => {
    const {slug} = req.params
    res.send("Fetching data for restaurant " + slug );
})

router.get("/:slug/menus", async (req, res) => {
    const {slug} = req.params
    res.send("Fetching menus data for restaurant " + slug );
})


module.exports = router