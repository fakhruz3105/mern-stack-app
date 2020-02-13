const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema (Schema is a layout for the database, it determines what kind of data stored in the data base)
const ItemSchema = new Schema({
  name: { //take this as column name for our table as in MySQL
    type: String, //type of data for this column
    required: true //set the requirement (nullable or not)
  },
  amount: {
    type: Number,
    min: 1,
    required: true,
    default: 1
  },
  date: {
    type: Date,
    default: Date.now //can be given default value ()
  }
});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;