const adminAuth=(req,res,next)=>{
    //checking admin is authenticated or not
    let token="samadhan";
    let isAdminAuthenticated= token==="samadhan"
    console.log(isAdminAuthenticated);
    if(!isAdminAuthenticated){
        res.status(401).send("Unauthorized admin");
    }else{
        next();
    }
}

const userAuth=(req,res,next)=>{
    //checking user is authenticated or not
    let token="samadhan";
    let isUserAuthenticated= token==="samadhan"
    console.log(isUserAuthenticated);
    if(!isUserAuthenticated){
        res.status(401).send("Unauthorized User");
    }else{
        next();
    }
}

module.exports={adminAuth,userAuth};