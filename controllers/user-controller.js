const {User} = require('../models')


module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const document = await User.find({})
            if (!document) {
                return res.status(500).json({message: 'no users found'})
            }
            return res.json(document)
        }catch (e) {
            res.status(500).json({message: e})
        }
    },
    newUser: async ({body}, res) => {
        try{
            const document = await User.create(body)
            if(!document){
                return res.status(500).json({message: 'User was not created'})
            }
            return res.json(document)
        }catch (e) {
            res.status(500).json({message: e})
        }
    },
    getUserById: async ({params}, res) => {
        const userId = params.id
        try{
            const document = await User.findById({_id:userId}).populate([{path:'thoughts',select:'-__v'},{path:'friends',select:'-__v'}]).select('-__v')
            if(!document){
                return res.status(500).json({message: 'User was not found'})
            }
            return res.json(document)
        }catch (e) {
            res.status(500).json({message: e})
        }
    },
    updateUserById: async ({params, body}, res) => {
        const userId = params.id
        try{
            const document = await User.findByIdAndUpdate({_id:userId},body,{new:true, runValidators:true})
            if(!document){
                return res.status(500).json({message: 'User was not found || Error updating user'})
            }
            return res.json(document)
        }catch (e) {
            res.status(500).json({message: e})
        }
    },
    deleteUserById: async ({params}, res) => {
        const userId = params.id
        try{
            const document = await User.findByIdAndDelete({_id:userId})
            if(!document){
                return res.status(500).json({message: 'User was not found || Error deleting user'})
            }
            return res.json(document)
        }catch (e) {
            res.status(500).json({message: e})
        }
    },
    addNewFriendToUser: async ({params}, res) => {
        const {userId, friendId} = params
        try{
            const verifyUserExists = User.findById({_id:friendId})
            if(!verifyUserExists){
                return res.status(500).json({message: 'This is not a valid Friend id'})
            }
            const document = await User.findByIdAndUpdate({_id:userId},{$push:{friends:friendId}},{new:true,runValidators:true})
            if(!document){
                return res.status(500).json({message: 'Error adding friend to user'})
            }
            return res.json(document)
        }catch (e) {
            res.status(500).json({message: e})
        }
    },
    removeFriendFromUser: async ({params}, res) => {
        const {userId, friendId} = params
        try{
            const verifyUserExists = User.findById({_id:friendId})
            if(!verifyUserExists){
                return res.status(500).json({message: 'This is not a valid Friend id'})
            }
            const document = await User.findByIdAndUpdate({_id:userId},{$pull:{friends:friendId}},{new:true,runValidators:true})
            if(!document){
                return res.status(500).json({message: 'Error removing friend from user'})
            }
            return res.json(document)
        }catch (e) {
            res.status(500).json({message: e})
        }
    }
}