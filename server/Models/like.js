const mongoose=require('mongoose')

const likeSchema= new mongoose.Schema({
    userId:String,
    vendorId: {type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }
    ,
    liked:Boolean
    
})
const likeModel=mongoose.model('likes',likeSchema);


module.exports=likeModel