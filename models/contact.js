const mongoose=require('mongoose');

//creating schema
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

//naming for storing in Db
const Contact=mongoose.model('Contact',contactSchema);

//exporting
module.exports=Contact;