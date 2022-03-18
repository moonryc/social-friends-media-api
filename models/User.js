const {Schema, model, Types} = require('mongoose')
const {emailValidator} = require("../utils/validators");

const UserSchema = new Schema({
        username: {type:String, unique:true, required:'username is required', trim:true},
        email: {type:String, unique:true, required:(email)=>emailValidator(email), trim:true, },
        thoughts: [{type:Types.ObjectId,ref:'Thought'}],
        friends: [{type:Types.ObjectId,ref:'User'}]
    },
    {
        toJSON: {
            virtuals: false,
            // getters: false
        },
        // id:false
    }
)

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length
})


const User = model('User',UserSchema)

module.exports = User