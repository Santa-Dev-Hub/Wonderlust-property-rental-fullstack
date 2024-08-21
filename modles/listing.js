const mongoose = require("mongoose");
const reviews = require("./reviews");
const { type } = require("../schema");
const { string, ref } = require("joi");
const Schema = mongoose.Schema;



// const imageSchema = new Schema({
//     filename: {
//         type: String,
//         required: true
//     },
//     url: {
//         type: String,
//         required: true,
//         default: "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg",
//         set: (v) => v === "" ? "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg" : v,
//     }
// });


const listingSchema = new Schema({
    title: {
        type : String,
        required: true,
    },
    /*     //now we will be setting a default image for our document! i.e if there is no image or undefined or null the  this default image will get stored
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2F404&psig=AOvVaw2lb8W5RoPdeLVr0GGP3Ptd&ust=1719214962073000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLCX5Puc8YYDFQAAAAAdAAAAABAE",
        //here we are checking if the image is there but its empty i.e ""  then this link will be shown i.e a error image will be shown!!
        set: (v) => v === "" ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2F404&psig=AOvVaw2lb8W5RoPdeLVr0GGP3Ptd&ust=1719214962073000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLCX5Puc8YYDFQAAAAAdAAAAABAE" : v,
        */
        description: 
        {
           type: String
        },
        image: {
            url:String,
            filename:String,
            // required: true,
        },
    price: {
        type : Number,
        required: true,
    },
    location: {
        type : String,
        required: true,
    },
    // country: {
    //     type : String,
    //     required: true,
    // },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"review", // Make sure this matches the model name in review.js
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});



listingSchema.post("findOneAndDelete",async(listing)=>{
    // console.log("Middleware triggered for listing:", listing);
    if(listing){
        await reviews.deleteMany({_id: {$in: listing.reviews}});
    }
});

/* Here we have defined a post mongoose MIDDLEWARE . HEre is how it functions
whenever findByIdAndDelete function will be triggered in the listing i.e wheneevr we will delete the swhole listing using its id
then internally findOneAndDelete" function will be triggered and this post middleware will be triggered no this post mddleware will delete all the 
reviews that are associated with the listing . {reviews: {$in: listing.reviews}} this line will check for all the reviews that are present
inside the listing ans will delete it using dleteMany */





const listing = mongoose.model("listing", listingSchema);
module.exports = listing;


