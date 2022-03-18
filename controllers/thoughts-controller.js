const {Thought} = require('../models')


module.exports = {
    getAllThoughts:async(req,res)=>{

    },
    newThought:async(req,res)=>{

    },
    getThoughtById: async ({params},res)=>{
        const {_id} = params
    },
    updateThought: async({params},res)=>{
        const {_id} = params
    },
    deleteThoughtById:async ({params},res)=>{
        const {_id} = params
    },
    newReaction:async({params},res)=>{
        const {thoughtId} = params
    },
    deleteReactionById:async({params},res)=>{
        const {thoughtId} = params
    }
}