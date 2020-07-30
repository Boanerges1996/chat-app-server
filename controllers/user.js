const User = require('../models/user')
const bcrpty = require('bcryptjs')



const registerUser = async (req, res)=>{
    if(!req.body)
        return res.status(400).send({message:"Please provide body",logged:"false"})
    else{
        const salt = await bcrpty.genSalt(10)
        const hashedPassword = await bcrpty.hash(req.body.password,salt)
        const user_info = {
            ...req.body,
            password: hashedPassword
        }

        //Verify User
        const verifyUser = await User.findOne({email:req.body.email})

        if(verifyUser===null){
            const user = new User(user_info)
            try{
                let savedUser = await user.save()
                
            }
            catch(err){
                res.send(err)
            }
        }
        else{
            res.status(401).send({user:"User Already exist",exist:true,logged:false})
        }   
    }
}


const login =async (req,res)=>{
    if(!req.body){
        res.send({message:"Please provide a body"})
    }
    else{
        const verifyUser = await User.findOne({email:req.body.email})
        if(verifyUser===null){
            res.send({message:"users account doesnt exist",logged:false})
        }
        else{
            let passwordVerify = await bcrpty.compare(req.body.password,verifyUser.password)
            if(passwordVerify){
                res.send({...verifyUser._doc,logged:true})
            }
            else{
                res.send({message:"Username or password is invalid",logged:false})
            }
        }
    }
}

const updateUser = async (req,res)=>{
    if(!req.body){
        res.send({message:"No info provided"})
    }
    else{
        try{
            const updatedInfo = await User.findOne({username:req.params.username})
            if(updatedInfo===null){
                res.send({message:"User account doesnt exist"})
            }
            else{
                const update = await User.updateOne({username:req.params.username},{$set:req.body})
                const data = await User.findOne({username:req.params.username})
                res.send(data)
            }
        }
        catch(err){
            res.send(err)
        }
    }
}

const getUserData = async (req,res)=>{
    if(!req.body){
        res.send({message:"No body provied"})
    }
    else{
        try{
            const getInfo = await User.findOne({username:req.params.username})
            if(getInfo===null){
                res.send({message:"User account doesnt exist"})
            }
            else{
                res.send(getInfo)
            }
        }
        catch(err){
            res.send(err)
        }
    }
}


const searchUser = async (req,res)=>{
    if(!req.body){
        res.send({message:"No body provied"})
    }
    else{
        let param = req.query.name.split(",")
        // console.log(param)
        // res.send(param)
        const array = []
        for(let i=0;i<param.length;i++){
            array[i]=new RegExp("^"+param[i]+"$","i")// Works for case insensitive text
        }
        console.log(array)
        // res.send(array)
        try{
            const search = await User.find({$or:
                [{firstname:array},
                {lastname:array}
                ,{othernames:array}]},{firstname:1,lastname:1,othernames:1,url:1})
            res.send(search)
        }
        catch(err){
            res.send(err)
        }       
    }
}


module.exports = {
    registerUser,
    login,
    updateUser,
    getUserData,
    searchUser
}