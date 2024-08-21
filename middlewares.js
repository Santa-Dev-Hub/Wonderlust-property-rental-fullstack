const listing=require("./modles/listing");
const express=require("express");
const {reviewSchema}=require("./schema");//here we are requiring the schemas that re defined with the help of Joi
const reviews = require("./modles/reviews");
//to validate our listings
const {listingSchema}=require("./schema");//here we are requiring the schemas that re defined with the help of Joi
//to validate our listings
module.exports.isloggedin=(req,resp,next)=>{
    if(!req.isAuthenticated()){//the isAuthenticated method checks if the user inforrmation that is stored within the current
        //session is valid or not
        req.session.redirectUrl=req.originalUrl;//if the user is already logged in then we'll save the original url
        req.flash("errormsg","You must be logged in to perform this Action");
        return resp.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,resp,next)=>{

    if(req.session.redirectUrl){
        resp.locals.redirectUrl=req.session.redirectUrl;//else we'll save the session url to the locals variables from where it can be used in any file
        delete req.session.redirectUrl;  // Clear the redirect URL after saving it to locals
    }

    next();
};


    module.exports.isOwner=async (req,resp,next)=>{
        let {id}=req.params;
        let listingtobeupdated= await listing.findById(id);
        if(!listingtobeupdated.owner.equals(resp.locals.currUser._id)){
            req.flash("errormsg","You dont have permisson to perform to perform this action!");
            return resp.redirect(`/listings/${id}`);
        }
        next();
    };


    //Code for validating our each listing

module.exports.validateListing=(req,resp,next)=>{
    let result = listingSchema.validate(req.body);
    
    if (result.error) {
        // If there's an error in validation, respond with the error details
        return resp.status(400).send(result.error.details[0].message);
    }
    else{
        next();
    }
    
}

//Code for validating our each reviews

module.exports.validateReview=(req,resp,next)=>{
    let result = reviewSchema.validate(req.body);

    if (result.error) {
        // If there's an error in validation, respond with the error details
        return resp.status(400).send(result.error.details[0].message);
    }
    else{
        next();
    }

}


module.exports.isReviewAuthor=async (req,resp,next)=>{
    let {id,reviewid}=req.params;

    
    const reviewtobealtered= await reviews.findById(reviewid);
    // console.log("Current User ID:", resp.locals.currUser._id);
    // console.log("Current User Name:", resp.locals.currUser.username);
    // console.log("Review Author ID:", reviewtobealtered.author);
    // console.log("Review Comment:", reviewtobealtered.comment);

    if( !reviewtobealtered||!reviewtobealtered.author||!reviewtobealtered.author.equals(resp.locals.currUser._id)){
        req.flash("errormsg","You are not the AUTHOR of this review");
        return resp.redirect(`/listings/${id}`);
    }
    next();
};