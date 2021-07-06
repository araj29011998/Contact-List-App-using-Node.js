const express=require('express');
const port=8800;
const path=require('path')
//database
const db=require('./config/mongoose');
//requiring contact
const Contact=require('./models/contact'); 


const app=express();

//use ejs as search engine
app.set('view engine','ejs');
//path of views
app.set('views',path.join(__dirname,'views'));
//middleware-for converting data submitted in form to key value pair to be processed
app.use(express.urlencoded());
//for static files
app.use(express.static('assets'));

//user built middleware 1
// app.use(function(req,res,next){
//     req.myname='Abhishek';
//     //console.log('middleware 1 called');
//     next();
// });

// //middleware 2
// app.use(function(req,res,next){
//     console.log("My name from Mw1=",req.myname);
//     next();
// })

//contact list to be sent
var contactList=[
    {
        name:"A",
        phone:"1"
    },
    {
        name:"B",
        phone:"2"
    }
]

//context
app.get('/',function(req,res){
    //console.log(__dirname);
    //res.send('<h1>Cool,it is running</h1>');
    
    //checking middleware
   // console.log("From the get route controller-",req.myname);
    

    //to get data from database
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title:"Contact List",
            contacts_list:contacts
        });
    });


});

//another controler for practice
app.get('/practice',function(req,res){
    return res.render('practice',
    {title:"Ley us play with ejs"});
});

app.post('/create-contact',function(req,res){
    //to redirect to a particular page
    //return res.redirect('/practice');

    //to print data filled using parser
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.phone);

    //to add in contact list- onto the server
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    //to add contact in database
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creatng a contact!');
            return;
        }
        console.log('***********',newContact);
        return res.redirect('back');
    });




    //return res.redirect('/');  //use 'back' to return to same page again
});

//to delete contact
app.get('/delete-contact',function(req,res){
    //console.log(req.params);
    //get the query from the url
    let phone=req.query.phone;

    //query code
    // let contactIndex=contactList.findIndex(contact=> contact.phone==phone);

    // //if index contact found
    // if(contactIndex!=-1)
    // {
    //     contactList.splice(contactIndex,1);
    // } 


    //get the id from query in the url
    let id=req.query.id;
    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from databse');
        }
        return res.redirect('back');
    });

    
});



app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error in running server',err);
    }
    console.log('Yup My express server is running on port',port);
});