const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const bandSchema = new Schema({
  name: String,
  password: String,
  style: String,
  description: String,
  price: Number,
  position:String,//preguntar mañana
  contact: String,
  discography: String,
  rider: String,//equipo que tiene la banda
  img: String

}, {
  timestamps: true
});

const Band = mongoose.model("Band", bandSchema);
module.exports = Band;