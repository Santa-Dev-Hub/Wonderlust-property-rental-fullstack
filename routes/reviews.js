const express=require("express");
// const router=express.Router();
const reviews=require("../modles/reviews"); 
const listing=require("../modles/listing");
const router = express.Router({ mergeParams: true });

const wrapAsync=require("../utilities/wrapasync");

const {reviewSchema}=require("../schema");//here we are requiring the schemas that re defined with the help of Joi
//to validate our listings


//requiring the validateReview middleware
const {validateReview, isloggedin, isReviewAuthor}=require("../middlewares");


 
 const reviewController=require("../controllers/reviews");
 
 
 
 
 //Reviews route
        
 router.post("/",validateReview,isloggedin, wrapAsync(reviewController.createReview));




//Delete review ROUTE




router.delete("/:reviewid",isloggedin,isReviewAuthor,wrapAsync(reviewController.deleteReview));


module.exports=router;