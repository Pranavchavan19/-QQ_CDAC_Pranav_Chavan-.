const express = require("express")
const router = express.Router()

const {getSamples,addSamples,getSummary,getFilter} = require("../Controller/Task")

router.route('/import2').post(addSamples)
router.route('/summary').get(getSummary)
router.route('/filter').get(getFilter)
router.route('/import').get(getSamples)

module.exports = router