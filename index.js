const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose")
app.use(express.json())

app.use(cors({
    origin:["https://mern-practice-1.vercel.app"],
   
    methods : ["GET","POST"],
    
}))

const port = process.env.port 


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
   imgUrl:String,
   like:Number
})


const Person = mongoose.model("person",{
   name:String,
   password:String,
   
})


app.get("/",async(req,res)=>{
    
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
      console.log(response , " <======== create post response");
      res.json(response)

    }catch(e){
      
      console.log("create_post error");
    
   }
   

})

app.post("/person_find",async(req,res)=>{
    
     console.log(req.body.id , " peson_find value ");
     const id = req.body.id;

     try{

       const response = await Person.findById(id);
       
       res.json(response);

     }catch(e){

       if(e){

          console.log(e);

       }
     }

     

})

app.post("/login",async(req,res)=>{
       
    const name = req.body.name;
    const password = req.body.password;

    try{
       
      const response = await Person.find({name:req.body.name},{password:req.body.password});
      res.json({"status":true,"value":response[0]._id});

    }catch(e){
       
       return res.json({"status":false})

    }

})




app.post("/person_register",async (req,res)=>{

   const name = req.body.name;
   const password = req.body.password;

     try{
        
        const response = await Person.create({name:name,password:password});
        
        res.json(response)

     }catch(e){
        
        if(e){
           console.log("register error")
        }

     }
     
})

app.post("/likePost",async(req,res)=>{
    
   console.log(req.body);
    
   try{
      const response = await Post.find({_id:id});
      const likeCount = response[0].like

      const response2 = await Post.findByIdAndUpdate({_id:id},{
         like:likeCount+1
      })
      console.log(response2);
   }catch(e){
      if(e){
         console.log(e);
      }
   }

})




app.listen(5005,(err)=>{

     if(err){
        console.log("server not started")
     }else{
        console.log("server is started")
     }

});