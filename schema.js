const Joi=require("joi");
const review = require("./modles/reviews");

const listingSchema=Joi.object({//there should be a Joi object
    
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        // country: Joi.string().required(),
        image:Joi.allow("",null)

}).required();// that object name should be listing and lisitng object should be there compulsorily and inside that listing object some 
    // parameters should be required 



const reviewSchema=Joi.object({
    review:Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().trim().required(),

    }).required(),
});

module.exports = {
    listingSchema,
    reviewSchema
};

// Joi.object({...}): This creates a Joi schema for an object.
// Inside this object, you define another object with the key review.
// review: Joi.object({...}): The review key is an object that contains:
// rating: Joi.number().required(): The rating key must be a number and is required (it cannot be omitted).
// comment: Joi.string().required(): The comment key must be a string and is required.
// }).required(): This makes the entire review object required, meaning the review key must be present in the data you validate.
