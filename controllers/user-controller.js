const {User, Thought} = require('../models')


module.exports = {
    //gets all users in database
    getAllUsers: async (req, res) => {
        try {
            const document = await User.find({}).select('-__v')
            if (!document) {
                return res.status(500).json({message: 'no users found'})
            }
            return res.json(document)
        }catch (e) {
            res.status(500).json({message: e})
        }
    },
    //Creates a new users and adds it in the database
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
    //returns user by user ID
    getUserById: async ({params}, res) => {
        const userId = params._id
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
    //updates existing user based on id
    updateUserById: async ({params, body}, res) => {
        const userId = params._id
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
    //Removes a user from the database by id
    deleteUserById: async ({params}, res) => {
        const userId = params._id
        try{
            const document = await User.findByIdAndDelete({_id:userId})
            if(!document){
                return res.status(500).json({message: 'User was not found || Error deleting user'})
            }
            const otherUsers = await User.updateMany({$in:{friends:userId}},{$pull:{friends:userId}},{new:true,runValidators:true})
            if(!otherUsers){
                return res.status(500).json({message: 'Error deleting user from others friends list'})
            }
            const thoughts = await Thought.deleteMany({username:document.username})
            if(!thoughts){
                return res.status(500).json({message: 'Error deleting user thoughts'})
            }
            return res.json(document)
        }catch (e) {
            res.status(500).json({message: e})
        }
    },
    //adds the userId to the other user friends array as well as adds the other persons user id to the users friend array
    addNewFriendToUser: async ({params}, res) => {
        const {userId, friendId} = params
        try{
            const doesUserExist = await User.exists({_id:userId})
            const doestFriendExist = await User.exists({_id:friendId})
            if(!doestFriendExist || !doesUserExist){
                return res.status(500).json({message: 'This is not a valid Friend id or not a valid User id'})
            }
            const friendDocument = await User.findByIdAndUpdate({_id:friendId},{$push:{friends:userId}},{new:true,runValidators:true})
            if(!friendDocument){
                return res.status(500).json({message: 'Error adding user to proposed friend'})
            }
            const document = await User.findByIdAndUpdate({_id:userId},{$push:{friends:friendId}},{new:true,runValidators:true})
            if(!document){
                return res.status(500).json({message: 'Error adding proposed friend to user'})
            }
            return res.json(document)
        }catch (e) {
            res.status(500).json({message: e})
        }
    },
    //removes the userId for both the friend and the user in each others array of friend ids
    removeFriendFromUser: async ({params}, res) => {
        const {userId, friendId} = params
        try{
            const doesUserExist = await User.exists({_id:userId})
            const doestFriendExist = await User.exists({_id:friendId})
            if(!doestFriendExist || !doesUserExist){
                return res.status(500).json({message: 'This is not a valid Friend id or not a valid User id'})
            }
            const friendDocument = await User.findByIdAndUpdate({_id:friendId},{$pull:{friends:userId}},{new:true,runValidators:true})
            if(!friendDocument){
                return res.status(500).json({message: 'Error removing friend from the users friend'})
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