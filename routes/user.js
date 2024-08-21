const express=require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utilities/wrapasync");
const passport=require("passport");

const {saveRedirectUrl}=require("../middlewares");


const userController=require("../controllers/users");


router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync (userController.addusertoDB));





router
  .route("/login")
  .get(userController.renderGetLoginForm)
  .post(saveRedirectUrl,//wheneevr we'll login then the saveRedirectUrl will save the url of rht current user then it will be authenticated with passport
    passport.authenticate('local',//we are using the authenticate function of passport for authenticating the user who is trying to login to our website
     { 
        failureRedirect: '/login', 
        failureFlash: true ,//if there is a faliure in the sense thta the username or password is incorrect then a flash message 
        //will be shown on the top of our page  BUT THIS FUNCTIONALITY IS NOT ATALL WORKING MANNNNNN -_- -_- I DONT KNOW HOW TO FIX THIS
        failureMessage: 'errormsg'
     }),
    userController.checkLoginInfoforUsers
  );

  


router.get("/logout",userController.logoutUSer);


module.exports=router;