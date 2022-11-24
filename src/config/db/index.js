const mongoose = require('mongoose');
let link =process.env.MONGODB_URI||"mongodb+srv://hoang:auJ4wXxOkTn3lR9C@cluster0.glxu3.mongodb.net/hoVaTenSinhVien?retryWrites=true&w=majority"
// let link = "mongodb://localhost:27017/hoVaTenSinhVien"

async function connect(){
    try {
        await mongoose.connect(link,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connect true');
    } catch (error) {
        console.log('Connect flase');
    }
}
module.exports = {connect};