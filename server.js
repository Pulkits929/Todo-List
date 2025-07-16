const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();

var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
  
const trySchema = new mongoose.Schema({
    name : String,
    priority : String
});

const item = mongoose.model("task", trySchema);


// todo2.save();
// todo3.save();


app.get("/",function(req,res){
    item.find().then(data=>{
        
        res.render("list", { ejes: data });
    }).catch(err =>{
    console.log("error:",err);
    });
})

app.post("/",function(req,res){
    const itemName = req.body.ele1;
    const itemPriority = req.body.priority;
    const todo4 = new item({
        name : itemName,
        priority : itemPriority
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

app.post("/update",function(req,res){
    const value = req.body.task_edit_btn;
    const updated_value = req.body.task_edit;

    item.updateOne({_id : value},{$set: {name:updated_value}}).then(result=>{
        console.log("Task updated!!!");
        res.redirect("/");
    })
    .catch(err => {
        console.error(err);
        res.send("Error updating task");
    });
})

app.listen("3000",function(){
    console.log("Server is running!!");
})