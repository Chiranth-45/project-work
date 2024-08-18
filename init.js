const mongoose = require('mongoose');
main().then((res)=>{
    console.log("connection successfull");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
const chat=require("./models/chat.js");

let allChats=[
    {
        from:"chiru",
        to:"rakshu",
        msg:"send me your exam sheet",
        created_at:new Date(),
    },
    {
        from:"chiru",
        to:"rakshu",
        msg:"send me your exam sheet",
        created_at:new Date(),
    },
    {
        from:"chiru",
        to:"rakshu",
        msg:"send me your exam sheet",
        created_at:new Date(),
    },
    {
        from:"chiru",
        to:"rakshu",
        msg:"send me your exam sheet",
        created_at:new Date(),
    },
    {
        from:"chiru",
        to:"rakshu",
        msg:"send me your exam sheet",
        created_at:new Date(),
    },
    {
        from:"chiru",
        to:"rakshu",
        msg:"send me your exam sheet",
        created_at:new Date(),
    },
];
chat.insertMany(allChats);
