import mongoose from "mongoose";
const { Schema } = mongoose;
const ItemSchema = new Schema({
  item: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  kilogram: {
    type: String,
    required: true,
  },
  distributerPrice: {
    type: Number,
    required: true,
  },
  dp: {
    type: Number,
    required: true,
  },
  costOfProduct: {
    type: Number,
    required: true,
  },
  packingCost: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  packingGst: {
    type: Number,
    required: true,
  },
  incTaxCost: {
    type: Number,
    required: true,
  },
  grossProfit: {
    type: Number,
    required: true,
  },
});
const Item = mongoose.model("Item", ItemSchema);
export default Item;
