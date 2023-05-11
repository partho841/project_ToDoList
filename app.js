const express =require('express');

const bodyParser =require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
// var items=["BuyFood" , "CookFood"," EatFood" ];
// var workItems=[];
mongoose.connect("mongodb+srv://parthsarkar25:Sarkar123@todo-list.pd5pba7.mongodb.net/todolistDB",{useNewUrlParser: true});
// mongoose.set('strictQuery', true);
const itemsSchema={
    name: String
}
const Item =mongoose.model("Item",itemsSchema);
const item1= new Item({
    name:"Welcome to your ToDo list"
})
const item2=new Item({
    name:"Hit the + button to dd a new item"
})

const item3 = new Item({
    name:"Hit this to delete an Item "
})
const defaultItem = [item1, item2,item3];




app.get("/",function(req,res){


var Day="";
var today = new Date();
currentDay=today.getDay();
var options={
    weakday :"long",
    day:"numeric",
    month:"long"
};
var day = today.toLocaleDateString("en-US",options);
  
    Item.find({},function(err,foundItems){

    if(foundItems===0){
        Item.insertMany(defaultItem ,function(err){
            if(err){console.log(err);
            }else{
              console.log("Added Successfully");
            } });
            res.redirect("/");}
    else{
        res.render("list", {ListTitle:day, newListItem: foundItems}); 
}})
});

app.post("/",function(req, res){
const itemName= req.body.newItem;
const item = new Item({
name : itemName
});
item.save();
res.redirect("/");
});

app.post("/delete",function(req,res){
    const getId= req.body.newitem;
    Item.findByIdAndRemove(getId,function(err){
        if(!err){
            console.log("Removed successfully")
        }
        res.redirect("/");
    })
})

  

app.get("/work",function(req,res){
    res.render("list", {ListTitle:"Work List",newListItem: workItems });
});

// app.post("/work",function(req,res){
//     var witem=req.body.newItem;
   
// });
app.get("/vamshi",function(req,res){
    res.render("about");
})

app.listen(3000,function(req,res){
    console.log("server is running on port 3000");
});

