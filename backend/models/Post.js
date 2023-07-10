const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    caption:String,
    image:{
        public_url:String,
        url:String
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    likes:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User"
            },
        },
    ],
    comments:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User"
            },
            comment:{
                type:String,
                required:true
            }
        }
    ]

})

module.exports = mongoose.model("Post",postSchema)