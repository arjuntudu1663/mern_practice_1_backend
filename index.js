
import express from 'express'

import cors from 'cors'
const app = express();

import mongoose from 'mongoose'
app.use(express.json())

app.use(cors({
    origin:["https://mern-practice-1-p1fh.vercel.app","http://localhost:3000"],
    methods : ["GET","POST"],
    
}))



try{
   mongoose.connect("mongodb+srv://arjuntudu9163:MPX02lqRppkyGUbU@cluster0.cq6wv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}catch(e){
   if(e){
      console.log("database connection error")
   }
}



const Post = mongoose.model("posts",{
   name:String,
   value:String,
   imgUrl:String
})
const Person = mongoose.model("person",{
   name:String,
   password:String
})


app.get("/first_api",async(req,res)=>{
    
    try{
       const response = await Post.find();
       console.log(response)
       res.json(response)
    }catch(e){
        if(e){
           console.log("first_api get error")
        }
    }
   

     
})

app.post("/create_post",async(req,res)=>{
    
    try{
       
      const response = await Post.create(req.body);
      console.log(response);

    }catch(e){
      
      console.log("create_post error");
    
   }
   

})

app.post("/login",async(req,res)=>{
       
    const name = req.body.name;
    const password = req.body.password;

    try{
       
      const response = await Person.find({name:req.body.name},{password:req.body.password});
      if(response.length>0){
          
         return res.json({"status":true})
      }

    }catch(e){
       
       return res.json({"status":false})

    }

})




app.post("/person_register",async (req,res)=>{

     console.log(req.body);
     try{
        
        const response = await Person.create(req.body);
        res.json(response)

     }catch(e){
        
        if(e){
           console.log("register error")
        }

     }
     
})




app.listen(5000,(err)=>{
     if(err){
        console.log("server not started")
     }else{
        console.log("server is started")
     }
});