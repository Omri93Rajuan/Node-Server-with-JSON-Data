const express = require('express');
const { getAllData, getData, createData,deleteData,updateData } = require('../models/dataAccessDataService');
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
        const card = await getAllData(parseInt(id));
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const newData = req.body;    
        await createData(newData);
        return res.status(201).send("Data created successfully");
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.delete("/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const deletedData = await deleteData(parseInt(id));
      return res.send(deletedData);
  } catch (error) {
      return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const updatedData = req.body;
      const editedData = await updateData(parseInt(id), updatedData);
      return res.send(editedData);
  } catch (error) {
      return handleError(res, error.status || 500, error.message);
  }
});


module.exports = router;
