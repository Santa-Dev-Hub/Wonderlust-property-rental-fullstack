const express=require("express");
const router=express.Router();
const listing=require("../modles/listing");
const {isloggedin, isOwner,validateListing}=require("../middlewares");


const wrapAsync=require("../utilities/wrapasync");

// const {listingSchema}=require("../schema");//here we are requiring the schemas that re defined with the help of Joi
//to validate our listings



const lisitngController=require("../controllers/listings");



const multer  = require('multer');


const {storage}=require("../cloudconfig");
const upload = multer({ storage });//multer will exract files from our code ad it will create a uploads folder and will
//upload the files there automatically!!!! previously we uploaded the files in  dest: 'uploads/' this type of folder i.e we are telling
//that the destination for our files will be a uploads folder but now we are ging to upload them in our cloudinary storage





//Listing route i.e to show all the places that are for rent

router.get("/",wrapAsync(lisitngController.index));
    
    
    


router
    .route("/new")    //creating a new listing route
    .get(isloggedin,lisitngController.renderNewForm)
    .post(isloggedin,
        upload.single('listing[image]'),
        validateListing,
         wrapAsync(lisitngController.postListing));    //Create ROUTE

    
    
    //show route i.e to see th detail for indivisuala route
    
    
    //Show route
    
    
    
    router.get("/:id",wrapAsync(lisitngController.showIndivisualListing));
    
    
    

    
    
    
    //Edit route
    
    
    router.get("/:id/edit",isloggedin,isOwner,wrapAsync(lisitngController.editListing));
    
    router.post("/:id",upload.single('listing[image]'), wrapAsync(lisitngController.updateListing));
    
    
    
        //Delete route
    
    
        router.delete("/:id/delete",isloggedin,isOwner, wrapAsync(lisitngController.deleteListing));
    
    
    
    //If the request dosen't match any of the route then we will handle it below like this
    
    
    
    
    //Handeling Error 
    
    // app.use((err,req,res,next)=>{
        //     let{status=500,message="Some Error Occured"}=err;
        //     res.status(status).send(message);
        // });
        
    
        
        //for logging ourr our user


        
       


    module.exports=router;