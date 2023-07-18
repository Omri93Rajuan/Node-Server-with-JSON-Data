const express =  require ("express")
const router =  express.Router()
const dataRestController = require("../data/routes/dataRestController")
const { handleError } = require("../utils/handleErrors");


router.use("/data",dataRestController)

router.use((req, res) => {
    handleError(res, 404, "Page not found!");
  });

module.exports = router