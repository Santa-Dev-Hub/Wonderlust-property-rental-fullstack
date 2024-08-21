class expressErrors extends Error{
    constructor(statuscode,newmessage){
        super();
         this.status=statuscode;
         this.message=newmessage;
    }
}
module.exports=expressErrors;