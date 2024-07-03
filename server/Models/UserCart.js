const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const  productSchema= new mongoose.Schema({
    userId:String,
    ProductId:String,
    shopname:String,email:String,shopmobilenumber:Number,shopaddress:String,shopImage:String,menuImage:String,role:String
})

const CartModel = mongoose.model("UserCart", productSchema)

module.exports=CartModel