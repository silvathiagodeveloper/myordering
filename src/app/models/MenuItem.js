const { Schema, models, model } = require("mongoose");

const ExtraPriceSchema = new Schema({
  name: {type:String},
  price: {type:Number},
});

const MenuItemSchema = new Schema({
  image: {type:String},
  name: {type:String, require: true},
  description: {type:String, require: true},
  basePrice: {type:Number, require: true},
  sizes: {type: [ExtraPriceSchema]},
  ingredients: {type: [ExtraPriceSchema]},
}, {timestamps: true});

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);