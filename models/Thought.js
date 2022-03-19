const {Schema, model, Types} = require('mongoose')
const {minMaxStringLengthValidator} = require("../utils/validators");
const {format} = require("date-fns");

const ReactionSchema = new Schema({
    reactionId:{type:Types.ObjectId, default: ()=>new Types.ObjectId()},
    reactionBody:{type:String, required:'reactionBody is required', validate:{validator:(reactionBodyValue)=>minMaxStringLengthValidator(reactionBodyValue,1,280)}, trim:true},
    username:{type:String, required:'username is required'},
    createdAt: {type:Date, default:Date.now, get:(createdAtValue)=>format(createdAtValue,'hh:mm a MM/dd/yyyy')},
},{
    toJSON:{
        getters:true
    }
})

const ThoughtSchema = new Schema({
        thoughtText: {type:String, required:'thoughtText is required',validate:{validator:(value)=>minMaxStringLengthValidator(value,1,280)}, trim:true},
        createdAt: {type:Date, default:Date.now, get:(createdAtValue)=>format(createdAtValue,'hh:mm a MM/dd/yyyy')},
        username: {type:String, required:'username is required', trim:true},
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: false,
            getters: false
        },
        // id:false
    }
)

ThoughtSchema.virtual('reactionCount').get(function () {
    //TODO is this the right length?
    console.log(this.reactions)
    if(this.reactions){

    }
    return this.reactions.length
})


const Thought = model('Thought',ThoughtSchema)

module.exports = Thought