const bodyParser = require("body-parser");
const express = require("express");

var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");

const trySchema = new mongoose.Schema({
    name : String
});

const item = mongoose.model("task", trySchema);


// todo1.save();
// todo2.save();
// todo3.save();

app.get("/",function(req,res){
    item.find().then(data=>{
        console.log("data fetched successfully!!");
        res.render("list",{ejes : data});
    }).catch(err =>{
    console.log("error:",err);
    });
})

app.post("/",function(req,res){
    const itemName = req.body.ele1;
    const todo4 = new item({
        name : itemName
    })
    todo4.save();
    res.redirect("/");
})

app.post("/delete",function(req,res){
    
    const checked = req.body.del_todo;
    
    item.findByIdAndDelete(checked).then(()=>{
        console.log("item deleted successfully!!!");
        res.redirect("/");
    }).catch((err)=>{
        console.log("error occured :: " , err);
        res.status(500).send("Failed to delete item.");
    })

})

app.listen("3000",function(){
    console.log("Server is running!!");
})