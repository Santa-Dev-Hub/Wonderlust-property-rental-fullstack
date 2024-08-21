const listing=require("../modles/listing");
const reviews=require("../modles/reviews");

module.exports.createReview=async(req,resp,next)=>{
    let{id}=req.params;//here we are extracting the id of the listing to be reviewed
    //console.log("Listing ID:", id);//printing the id
    let listingtobereviewed=await listing.findById(id);//here we are finding the listing from our db for whose we have to add the 
    // review for


    let newreview=new reviews(req.body.review);//see here This creates a new instance of the reviews model using the provided 
    // review data. The reviews model expects an object with fields that match its schema (in this case, comment, rating, 
    // and createdat).
    console.log("Review Data:", req.body.review);
    
    listingtobereviewed.reviews.push(newreview);//this pushes the new review array in the reviews filed of the selected listing

    // console.log("Current User ID:", req.user._id);
    // console.log("Current User NAME:", req.user.username);

    newreview.author=req.user._id;

    await newreview.save();//newreview is saved in its reviews schema as its a one to many relationship so we have to create
    //seperate schemas i.e one for listing and one for reviews
    await listingtobereviewed.save();//then the new modified and updated listing data is saved
    console.log("New review saved");
    req.flash("reviewmsg","New Review saved!");
    resp.redirect(`/listings/${id}`);
};



module.exports.deleteReview=async(req,resp)=>{
    let{id,reviewid}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}})//the pull operator removes from an existing array all the instances of a value
    //or values that match a specified codition
    // await reviews.findByIdAndDelete(reviewid);//here we are removng the indivisual review by finding it through its review id
    // req.flash("reviedeletewmsg","Review deleted!");
    //    resp.redirect(`/listings/${id}`);
    
    // console.log("Review id is: ",reviewid);

   const reviewtobedeleted= await reviews.findByIdAndDelete(reviewid);//here we are removng the indivisual review by finding it through its review id
  //  console.log("Review that is deleted is: ",reviewtobedeleted);
   if (!reviewtobedeleted) {
    // Handle case where review is not found
    req.flash("errormsg", "Review not found!");
    return resp.redirect(`/listings/${id}`);
  }

    req.flash("reviedeletewmsg","Review deleted!");
     resp.redirect(`/listings/${id}`);

};