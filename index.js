const express=require("express");
const app=express();
const port=3000;
const methodOverride=require("method-override");
const path=require("path");
const mongoose = require('mongoose');
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true})); //to parse the data for post request
const chat=require("./models/chat.js");
app.use(methodOverride("_method"));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("root is working");
});
app.listen(port,(req,res)=>{
   console.log("server started");
});
main().then((res)=>{
    console.log("connection successfull");
}).catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
//index route
app.get("/chats",async (req,res)=>{
    const chats=await chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
});
//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/chats",(req,res)=>{
    let {from,msg,to}=req.body;
    let newChat=new chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
   newChat.save().then((res)=>{
    console.log("chat was saved");
   }).catch((err)=>{
    console.log("some error");
   })
    res.redirect("/chats");
});
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let mess=await chat.findById(id);
    res.render("edit.ejs",{mess});
});
app.put("/chats/:id",async (req,res)=>{
    let{id}=req.params;
    let {msg:newmess}=req.body;
    let updateChat=await chat.findByIdAndUpdate(id,{msg:newmess},{runValidators:true,new:true} );
     console.log(newmess);
    //  console.log(updateChat);
    res.redirect("/chats");
});
app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let chatdelete=await chat.findByIdAndDelete(id);
    res.redirect("/chats");
});
