const { Schema, models, model } = require("mongoose");

const CategorySchema = new Schema({
  name: {type:String, require: true},
}, {timestamps: true});

export const Category = models?.Category || model('Category', CategorySchema);