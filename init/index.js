const mongoose=require("mongoose");
const initdata=require("./data.js");
const listing=require("../modles/listing.js");

async function main(){

    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
 }
 
 
 main().then(()=>{
     console.log("CONNECTED TO DB")
 })
 .catch(error=>{
     console.log(error);
 });

 const initDB= async()=>{
    await listing.deleteMany({});//this is to empty the database if there is something previously

    initdata.data=initdata.data.map((obj)=> ({...obj,owner:"66b6394f6b2a9481d1781569"}));
    await listing.insertMany(initdata.data);
    console.log("Data was initialized");
 };

 initDB();