const createUsers = require('./users-seeds')
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017/social-network-api',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const seedData = async () => {

    try {
        const createdUsers = await createUsers(Math.random())

    } catch (e) {
        console.log(e)
    }
    process.exit(1)

}

(async () => {
    await seedData()
})()
