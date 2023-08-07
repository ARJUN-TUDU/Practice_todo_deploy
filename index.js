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

mongoose.connect(DATABASE).then(()=>{
    
    app.listen(PORT,()=>{
        console.log("app is running",PORT);
    })
}).catch(err=>{
    console.log(err);
})


const todoSchema = mongoose.Schema({

    id : Number , 
    title : String

});


const Todos = mongoose.model("todo_list",todoSchema)


app.get("/todos",async(req,res)=>{
    
    
    const data = await Todos.find();
    res.json(data);
   

});

app.get("/",async(req,res)=>{

    res.send({name:"bokachoda"});

});

app.post(`/todoset`,async(req,res)=>{
    
    const obj = new Todos({
        id : req.body.id,
        title:req.body.title
    })

     await obj.save();

});


app.post('/')



