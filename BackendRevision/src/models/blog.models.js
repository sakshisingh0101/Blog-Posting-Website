import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const blogSchema=new mongoose.Schema({
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  postImage:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
    
  },
  content:{
    type:String,
    
  }

},{Timestamps:true})
blogSchema.plugin(mongooseAggregatePaginate);
export const Blog=mongoose.model("Blog",blogSchema);