const express = require('express');
const { getDatas,getData } = require('../models/dataAccessDataService');
const router = express.Router();
const { handleError } = require('../../utils/handleErrors');

router.get('/', async (req, res) => {
    try {
        const cars = await getDatas();
        return res.send(cars);
    } catch (error) {
        return handleError(res, error.status || 403, error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const card = await getData(parseInt(id));
      return res.send(card);
    } catch (error) {
      return handleError(res, error.status || 500, error.message);
    }
  });


module.exports = router