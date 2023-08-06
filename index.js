const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({path:'./.env'});
const PORT = process.env.PORT || 5000

const DATABASE = process.env.DATABASE


const app = express();
app.use(express.json());
app.use(cors());


try{

    mongoose.connect(DATABASE);

}catch(e){

    console.log("database connection error");

}



const todoSchema = mongoose.Schema({

    id : Number , 
    title : String

})


const Todos = mongoose.model("todo_list",todoSchema)






app.get("/todos",async(req,res)=>{
    
    const data = await Todos.find();
    res.json(data);

})

app.post(`/todoset`,async(req,res)=>{
    
    const obj = new Todos({
        id : req.body.id,
        title:req.body.title
    })

     obj.save();
    


})



app.listen(PORT,(err)=>{
    
    if(err){
        console.log("error app start")
    }else{
        console.log("app started successfully")
    }
});

