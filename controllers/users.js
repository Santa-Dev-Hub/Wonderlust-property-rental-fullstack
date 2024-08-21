const Usermodel=require("../modles/users");





module.exports.renderSignupForm=(req,resp)=>{
    // console.log("GET /signup");
    resp.render("./users/signup.ejs");
};


module.exports.addusertoDB=async(req,resp)=>{
    // console.log("POST /signup");
    try
    {
        let {username,email,password}=req.body;//to extract the username email and password from the req body
        const newuser=new Usermodel({email,username});//creating a new user model
        const registereduser=await Usermodel.register(newuser,password);//trying to register the new user whose details we have got from
        //the new user form
        console.log(registereduser);
        req.login(registereduser,(err)=>{
            if(err){
                return(err);
            }
            req.flash("success","Welcome to WonderLust");
            resp.redirect("/listings"); 
        });

    }
    catch (err) {
         
            req.flash("errormsg", err.message);
        
        resp.redirect("/signup");
    }

};



module.exports.renderGetLoginForm=(req,resp)=>{
    console.log("getlogin");
    resp.render("./users/login.ejs");
};


module.exports.checkLoginInfoforUsers= async(req,resp)=>{
    console.log("postlogin");
    req.flash("success","Welcome back to Wanderlust");

    const thisredirectUrl=resp.locals.redirectUrl || '/listings' ;
    console.log(thisredirectUrl);
    
resp.redirect(thisredirectUrl);
};


module.exports.logoutUSer=(req,resp,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("reviewdeletemsg","You are now Logged Out!");
        resp.redirect("/listings");
    });
};