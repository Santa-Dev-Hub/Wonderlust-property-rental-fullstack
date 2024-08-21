const listing = require("../modles/listing");
const { listingSchema } = require("../schema");//here we are requiring the schemas that re defined with the help of Joi
//to validate our listings
module.exports.index = async (req, resp) => {
    const alllistings = await listing.find({});
    //console.log(alllistings); // Log data to check structure
    resp.render("listings/alllistings.ejs", { alllistings });
}



module.exports.renderNewForm = (req, resp) => {

    resp.render("listings/newpost.ejs");

};


module.exports.showIndivisualListing = async (req, resp) => {
    let { id } = req.params;
    //our data
    const indivisuallisting = await listing.findById(id)
        .populate({
            path: "reviews",
            populate: {//this is nested populating!!!!!!!!!!!!1
                path: "author",
            },
        })
        .populate("owner");//here we are populating the reviews ttribute of
    if (!indivisuallisting) {
        req.flash("errormsg", "No listing Found!");
        return resp.redirect("/listings");
    }
    resp.render("listings/showindivisuallisting.ejs", { indivisuallisting });
};


module.exports.postListing = async (req, resp, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "         ", filename);
    console.log(req.body);//we are passing the valiadate schema here to validate our data before posting it
    //this is very necessary because it will prevent the users to add unwanted unmeaningful data!!


    let { title: newtitle, description: newdescription, price: newprice, location: newlocation, image: newimage } = req.body;
    // Ensure price is a number
    newprice = parseInt(newprice);
    if (isNaN(newprice)) {
        throw new expressErrors(500, "Invalid price value");
    }


    const image = newimage && newimage.url ? {
        filename: newimage.filename || "default.jpg",
        url: newimage.url
    } : {
        filename: "default.jpg",
        url: "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
    };

    const newdata = new listing({
        title: newtitle,
        description: newdescription,
        price: newprice,
        location: newlocation,
        image: req.file ? { url, filename } : image
    });

    // newdata.image={url,filename};
    newdata.owner = req.user._id;
    await newdata.save();
    console.log("New data saved");
    req.flash("success", "New Listings created!");
    resp.redirect("/listings");

};


module.exports.editListing = async (req, resp) => {
    let { id } = req.params;
    let listingtobeedited = await listing.findById(id);
    if (!listingtobeedited) {
        req.flash("errormsg", "No listing Found!");
        return resp.redirect("/listings");
    }
    let originalimageUrl=listingtobeedited.image.url;
    originalimageUrl=originalimageUrl.replace("/upload","/upload/,w_250");
    resp.render("listings/edit.ejs", { listingtobeedited, originalimageUrl});
};


module.exports.updateListing = async (req, resp) => {
    // console.log(req.body);
    let { id } = req.params;
    let { title: newtitle, description: newdescription, price: newprice, location: newlocation} = req.body;

    // Ensure image is updated correctly
    // let updatedImage = {
    //     filename: "default.jpg",
    //     url: image || "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
    // };


    /* Now we will be adressing another type of flaw i.e any user cna send request from hoppscotch or postman to our edit or delete button 
    so to protect that we have to protct ur routes also ans for that first we have found the indivisual listing then we are verifying
    that the user who is trying to edit the listing is the owner of the lisitng or not if he/she is not then we are displaying
    a flash error message. Here the listingtobeupdated.owner will automatically compare the id of the listing owner
    becaue we ahve defined the type of the owner as type:Schema.Types.ObjectId which will automatically take the id of the owner as there
    is ObjectId written there*/




    let listingtobeedited = await listing.findById(id);

    // Update the listing fields
    listingtobeedited.title = newtitle;
    listingtobeedited.description = newdescription;
    listingtobeedited.price = newprice;
    listingtobeedited.location = newlocation;
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        listingtobeedited.image = { url, filename };
    }
    else if (!listingtobeedited.image) {
        req.flash("deletemsg", "Add a valid image!");
    }



    await listingtobeedited.save();  // Save the changes to the listing
    req.flash("editmsg", "Listing Edited!");
    // let updatedListing = await listing.findById(id);
    // console.log("Updated Listing:", updatedListing);
    resp.redirect(`/listings/${id}`);
    console.log("EDITED");
};


module.exports.deleteListing = async (req, resp) => {
    let { id } = req.params;
    let deleteddata = await listing.findByIdAndDelete(id);
    console.log("DELETED data is :-");
    console.log(deleteddata);
    req.flash("deletemsg", "Listings Deleted!");
    resp.redirect("/listings");
};