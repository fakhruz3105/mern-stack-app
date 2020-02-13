const express = require('express');
const cors = require('cors');
const router = express.Router();

//Item model
const Item = require('../../models/Item');

//@route        GET api/items
//@description  get all items from database
//@access       Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    return res.json(items);
  } catch (err) {
    console.error(err);
  }
});

//@route        POST api/items
//@description  add new item
//@access       Public
router.post('/', async (req, res, next) => {
  try {
    res.json(await Item.create(req.body));
  } catch (err) {
    if(err.name === 'ValidationError') {
      res.status(422);
    }
    next(err);
  }
});

//@route        PUT api/items
//@description  edit item amount
//@access       Public
router.put('/:id', async (req, res, next) => {
  try {
    await Item.findByIdAndUpdate({_id: req.params.id}, req.body);
    const editedItem = await Item.findById({_id: req.params.id});
    res.json(editedItem);
  } catch (err) {
    next(err);
  }
});

//@route        DELETE api/items
//@description  delete item
//@access       Public
router.delete('/:id', async (req, res) => {
  try {
    await Item.findById(req.params.id).deleteOne();
    return res.json({ success: true });
  } catch (err) {
    return res.status(404).json({ success: false });
  }
});

module.exports = router;