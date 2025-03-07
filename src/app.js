const express= require('express');
const connectDB=require('./utils/database'); 
const app  = express(); //creating an express app
const User= require('./models/user'); //importing the user model

app.use(express.json()); //middleware to parse the incoming request with json payload.

app.post('/signup',async (req,res)=>{
    //creating a new instance of the user model
    const userObj=new User(req.body); 
    console.log(req.body) 
    try{
        await userObj.save(); 
        res.send('User added successfully');
    }
    catch(err){
        res.status(400).send('something went wrong',err);
        
    }   
});
//Get user by email
app.get('/user',async(req,res)=>{
    try{
        const users= await User.find({email:req.body.email});
        if(users.length===0){
            return res.status(404).send('User not found');
        }
        res.send(users);
    }
    catch(err){
        res.status(400).send('something went wrong');
    }
});

//find first user with given email
app.get('/user1',async(req,res)=>{
    try{
        const users=await User.findOne({email:req.body.email});
        if(!users){
            return res.status(404).send('User not found');
        }
        res.send(users);
    }catch(err){
        res.status(400).send('Something went wrong');
    }
})
//GET feed -get all the users from the database
app.get('/feed',async(req,res)=>{
    try{
        const users= await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send('something went wrong');
    }
})
// delete user by using id 
app.delete("/user",async(req,res)=>{
    try{
        const users=await User.findByIdAndDelete(req.body.id);
        if(!users){
            return res.status(404).send('User not found');
        }
        res.send(users);
    }catch(err){
        res.status(400).send('Something went wrong');
    }
})
//update user by using id
app.patch('/user',async(req,res)=>{
    const userID=req.body.id;
    try{
        const user= await User.findByIdAndUpdate(userID,req.body);
        if(!user){
            return res.status(404).send('User not found');
        }
        res.send(user);
    }catch{
        res.status(400).send('Something went Wrong');
    }
    
})
app.put('/user',async(req,res)=>{
    const userID=req.body.id;
    console.log(userID);
    try{
        const user= await User.findOneAndReplace({_id: userID},req.body,{new:true});
        console.log(user);
        if(!user){
            return res.status(404).send('User not found');
        }
        res.send(user);
        
    }catch{
        res.status(400).send('Something went Wrong');
    }
})

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
 

