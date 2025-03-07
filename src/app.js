const express= require('express');
const connectDB=require('./utils/database');
const app  = express();

const User= require('./models/user')

connectDB()
.then(()=>{
    console.log('Database connected successsfully');
    app.listen(4545,()=>{
        console.log('server is running on port 4545');
    })
})
.catch((err)=>{
    console.log('Erro in connecting database',err);
});

app.post('/signup',async (req,res)=>{
    //creating a new instance of the user model
    const userObj=new User({
        firstName:"Sai",
        lastName:"Pallavi",
        email:"saipallavi@18",
        password:"SaiPallavi@🤞🫰"
    });  
    try{
        await userObj.save(); 
        res.send('User added successfully');
    }
    catch(err){
        res.status(400).send('something went wrong',err);
        
    }
    
    
})
 

