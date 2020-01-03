const mongoose = require("mongoose")

const model = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    password:{
        type:String,
        max:1024,
        min:10,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    url:{
        type:String,
        default: "https://image.flaticon.com/icons/png/512/126/126486.png"
    },
    firstname:{
        type: String,
        default:""
    },
    lastname:{
        type: String,
        default:""
    },
    othernames:{
        type: String,
        default:""
    },
    telephone:{
        type: String
    }
})

module.exports = mongoose.model("user",model)