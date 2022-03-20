const {Thought, User} = require('../models')


module.exports = {
    //gets all thoughts in the database
    getAllThoughts: async (req, res) => {
        try {
            const document = await Thought.find({})
            if (!document) {
                return res.status(500).json({message: 'no Thoughts were found'})
            }
            return res.json(document)
        } catch (e) {
            res.status(500).json({message: e})
        }
    },
    //creates a new thought
    newThought: async ({body}, res) => {
        const {username} = body
        try {
            const doesUserExist = await User.exists({username:username})
            if(!doesUserExist){
                return res.status(500).json({message:'could not find user'})
            }
            const document = await Thought.create(body)
            if(!document){
                return res.status(500).json({message:'newThought could not be created'})
            }
            const user = await User.findOneAndUpdate({username:username},{$push:{thoughts:document._id}},{new:true,runValidators:true})
            console.log(user)
            if(!user){
                return res.status(500).json({message:'newThought could not be added to user'})
            }
            return res.json(document)
        } catch (e) {
            res.status(500).json({message: e})
        }
    },
    //Returns a Though by its ID value
    getThoughtById: async ({params}, res) => {
        const {_id} = params
        try {
            const document = await Thought.find({_id:_id})
            if (!document) {
                return res.status(500).json({message: 'Thought with provided ID does not exist'})
            }
            return res.json(document)
        } catch (e) {
            res.status(500).json({message: e})
        }
    },
    //Updates a Thoughts properties based off of the values from the body
    updateThought: async ({params,body}, res) => {
        const {_id} = params
        try {
            const document = await Thought.findByIdAndUpdate({_id:_id},body,{new:true,runValidators:true})
            if (!document) {
                return res.status(500).json({message: 'Error updating Thought with provided ID'})
            }
            return res.json(document)
        } catch (e) {
            res.status(500).json({message: e})
        }
    },
    //Deletes a Thought by ID
    deleteThoughtById: async ({params}, res) => {
        const {_id} = params
        try {
            const document = await Thought.findByIdAndDelete({_id:_id})
            if (!document) {
                return res.status(500).json({message: 'Error deleting Thought with provided ID'})
            }
            const doesUserExist = await User.findOneAndUpdate({username:document.username}, {$pull:{thoughts:_id}},{new:true,runValidators:true})
            if(!doesUserExist){
                return res.status(500).json({message:'could not find user'})
            }
            return res.json(document)
        } catch (e) {
            res.status(500).json({message: e})
        }
    },

    newReaction: async ({params,body}, res) => {
        const {thoughtId} = params
        try {
            const document = await Thought.findByIdAndUpdate({_id:thoughtId},{$push:{reactions:body}},{new:true,runValidators:true})
            if(!document){
                return res.status(500).json({message: 'Error creating Reaction with provided Thought ID'})
            }
            return res.json(document)
        } catch (e) {
            res.status(500).json({message: e})
        }
    },
    deleteReactionById: async ({params}, res) => {
        const {thoughtId, reactionId} = params
        try {
            const document = await Thought.findByIdAndUpdate({_id:thoughtId},{$pull:{reactions: {reactionId}}},{new:true,runValidators:true})
            if(!document){
                return res.status(500).json({message: 'Error creating Reaction with provided Thought ID'})
            }
            return res.json(document)
        } catch (e) {
            res.status(500).json({message: e})
        }
    }
}