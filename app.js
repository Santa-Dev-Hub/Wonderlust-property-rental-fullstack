if(process.env.NODE_ENV != "production"){//as the environment variables contains all the sensitive information i.e the variables which will
    //help us in our development but we will not share them anywhere when we'll deploy the project thats why we'll use this condition
    //that when ourNODE_ENV value is not equal to production then only the .env file contents will get prnted else not!!!!!!!
    require('dotenv').config();
}
// console.log(process.env.SECRET);

    let mongoatlas_url=process.env.MONGO_ATLAS_CONNECT_URL;

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./modles/listing");

const path=require("path");
const { error } = require("console"); 
app.set("views", path.join(__dirname, "views"));
const ejsmate=require("ejs-mate");
app.set("view engine", "ejs");
app.engine('ejs',ejsmate);
//const {listingSchema,reviewSchema}=require("./schema");//here we are requiring the schemas that re defined with the help of Joi
//to validate our listings

const session=require("express-session");
const flash=require("connect-flash");


const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const User=require("./modles/users");

//REQUIRING mongo store
const MongoStore = require('connect-mongo');

const store=MongoStore.create({
    mongoUrl:mongoatlas_url,
    //When working with sensitive session data it is recommended to use encryption and for this encryption we use crypto
    crypto: {
        secret: process.env.SECRET,
      },
      touchAfter:12*3600,
      //we use this touchafter variable to store the session information uptill 12hours because we dont want the user to login again and again
      //when he/she refreshes the page
});



//REQUIRING sessions and defining the different session options
//ITs gonna create a mongo store for us

const sessionOptions={
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true
};



store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",error);
});




//Requiring the REVIEWS and LISTINGS routes
const listingsroute=require("./routes/listing");
const reviewsroute=require("./routes/reviews");
const userroute=require("./routes/user");






const expressErrors=require("./utilities/ExpressErrors");


app.use(session(sessionOptions));//useing the sessionoptions here
app.use(flash());//use this before all the listings becuase we want our control to pass from this sbefore passing from another route




app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


app.use(passport.initialize());//we write this line so that every request that will come to our webpage will get initialised autonatically
app.use(passport.session());
passport.use(new LocalStrategy( User.authenticate()));//thi line means that every user that comes and logins into our website should 
//authenticate through LocalStrategy and to authenticate the authenticate() will be used
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



const methodOverride = require('method-override');



const { Passport } = require("passport");

// const listingSchema = require("./schema");
app.use(methodOverride('_method'));



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});


//Below are the variables that we want to send with our res.render we can define them with like this as below
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.deletemsg = req.flash('deletemsg');
    res.locals.editmsg = req.flash('editmsg');
    res.locals.reviewmsg = req.flash('reviewmsg');
    res.locals.reviewdeletemsg = req.flash('reviewdeletemsg');
    res.locals.errormsg = req.flash('errormsg');
    res.locals.currUser=req.user;//this is for seending the current user information to the ejs files i.e in any ejs file
    //we can access the current user by simply writing currUser
    next();
});



async function main(){
    
    await mongoose.connect(mongoatlas_url);
}






// app.get("/demouser",async(req,resp)=>{
// let fakeuser=new User({
//     email:"demostudent@gmail.com",
//     username:"delta-student"
// });
// try{


// let registeredUser = await User.register(fakeuser,"helloworld");//here the "helloworld" is thte password
// resp.send(registeredUser);
// }catch(err){
//     resp.status(500).send(err.message);
//     console.error(error); // Handle registration errors gracefully
// }
// });







main().then(()=>{
    console.log("CONNECTED TO DB")
})
.catch(error=>{
    console.log(error);
});



// app.get("/testlisting",(req,resp)=>{
    //     let sampleListing = new listing({
        //         title:"My new Villa",
        //         image:"",
        //         description:"By the beach",
//         price:1500,
//         location:"Calanguat,Goa",
//         country:"India",
//     });                                               this route was just to test that the data is being saved correctly or not
//     sampleListing.save().then(()=>{
    //     console.log("Saved Successfully");
    //     })
    //    .catch((error)=>{
        //     console.log(error);
        //    }); 
        //    resp.send("Working");
        // });
        
        
        
        
        
        
        
        
        
        
        
app.use("/listings",listingsroute);
app.use("/listings/:id/reviews",reviewsroute);
app.use("/",userroute);
        

// Root route
app.get('/', async (req, res) => {
  try {
    const listings = await listing.find({});
    res.render('listings/alllistings', { alllistings: listings });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching listings");
  }
});


        
app.use((err,req,res,next)=>{
    let{status=500,message="Some Error Occured"}=err;
    // res.status(status).send(message);
    res.status(status).render("listings/error.ejs",{message});
});

//the below route will be useful when we suppose i am trying to delete any review without loggin in then i will be asked to
//login then i will be tried to redirect to /listings/66b63985abb55dba7f21e144/reviews/66b76df2ab81b8b2e5ae648b?_method=DELETE this
//kind of route but there is no route like this thats why i will be redirected to /listings route 
app.use((req, res, next) => {
    // Check if the request matches the pattern for a review deletion but has no matching route
    const reviewDeletePattern = /^\/listings\/[a-fA-F0-9]{24}\/reviews\/[a-fA-F0-9]{24}\?_method=DELETE$/;

    if (reviewDeletePattern.test(req.originalUrl)) {
        // Redirect to the /listings route
        req.flash("success","Welcome back to WonderLust");
        return res.redirect('/listings');
    }

    // Pass to the next middleware or the 404 handler
    next();
});



app.all("*",(req,res,next)=>{
    next( new expressErrors(404,"Page not found"));
});
