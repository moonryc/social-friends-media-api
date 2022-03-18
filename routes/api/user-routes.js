const {getAllUsers, newUser, getUserById, updateUserById, deleteUserById, addNewFriendToUser, removeFriendFromUser} = require("../../controllers/user-controller");
const router = require('express').Router()


router.route('/').get(getAllUsers).post(newUser)

router.route('/:_id').get(getUserById).put(updateUserById).delete(deleteUserById)

router.route('/:userId/friends/:friendId').post(addNewFriendToUser).delete(removeFriendFromUser)


module.exports = router