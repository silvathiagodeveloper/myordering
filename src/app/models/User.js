const { Schema, models, model } = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: {type: String},
  email: {type: String, require: true, unique: true},
  image: {type: String},
  password: {
    type: String, 
    require: true, 
    validate: pass => {
      if(!pass?.length || pass.length < 5) {
        new Error('password must be at least 5 characters');
        return false;
      }
    }
  },
  phone: {type: String},
  streetAddress: {type: String},
  city: {type: String},
  postalCode: {type: String},
  country: {type: String},
  admin: {type: Boolean, default: false},
}, {timestamps: true});

UserSchema.pre('save', async function(next) {
  if(!this.isModified('password')){
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
})

export const User = models?.User || model('User', UserSchema);