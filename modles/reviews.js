const mongoose = require("mongoose");
const { type } = require("../schema");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    createdat:{
        type:Date,
        default:Date.now(),
    },
    author:{
        type:Schema.ObjectId,
        ref:"User",
    }
});

const review = mongoose.model("review", reviewSchema);
module.exports = review;