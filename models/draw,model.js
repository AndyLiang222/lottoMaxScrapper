const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const drawSchema = new Schema ({
    rawDate: {type: Number, required:true},
    date: {type: String, required: true},
    bonusNum:{type: Number},
    number: {type:Array, required: true},
    maxMillionNums: {type: Array},
    prizeDis:{type: Array, required: true}
}
, {
    timestamps: true,
  })
const Draw = mongoose.model('Draw',drawSchema );

module.exports = Draw;