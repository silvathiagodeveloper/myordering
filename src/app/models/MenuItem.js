const { Schema, models, model } = require("mongoose");

const MenuItemSchema = new Schema({
  image: {type:String},
  name: {type:String, require: true},
  description: {type:String, require: true},
  basePrice: {type:Number, require: true}
}, {timestamps: true});

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);