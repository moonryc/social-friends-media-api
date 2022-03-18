const {getThoughtById, getAllThoughts, newThought, updateThought, deleteThoughtById, deleteReactionById, newReaction} = require("../../controllers/thoughts-controller");
const router = require('express').Router()


router.route('/').get(getAllThoughts).post(newThought)

router.route('/_id').get(getThoughtById).put(updateThought).delete(deleteThoughtById)

router.route('/:thoughtId/reactions').post(newReaction).delete(deleteReactionById)


module.exports = router