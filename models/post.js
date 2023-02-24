import mongoose from "mongoose";
const postSchema = mongoose.Schema({
    userId: {
        type: String,
        required : true,
    },

    firstName: {
        type: String,
        required : true,
    },

    lastName: {
        type: String,
        required : true,
    },

    loctaion : String,

    description: String,

    PicturePath: String,

    userPicturePath : String,

    likes: {
        type: Map,
        of: Boolean,
    },

    comments :{
        type: Array,
        default :[]
    },

},
    { timestamps : true}
);

export const Post = mongoose.model( "Post", postSchema);