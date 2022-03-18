const {User} = require('../models')




const createUsers = async (modifyingNumber) => {

    const usersArray=[
        {
            username:`john${modifyingNumber}`,
            email:`john@john.com${modifyingNumber}`,
        },
        {
            username:`george${modifyingNumber}`,
            email:`george@george.com${modifyingNumber}`,
        },
        {
            username:`ringo${modifyingNumber}`,
            email:`ringo@ringo.com${modifyingNumber}`,
        },
        {
            username:`paul${modifyingNumber}`,
            email:`paul@paul.com${modifyingNumber}`,
        }
    ]

    try{
        const document = await User.create(usersArray)
        if(!document){
            throw 'error in creating users'
        }
        return document
    }catch (e) {
        console.log(e)
    }
}

module.exports = createUsers

