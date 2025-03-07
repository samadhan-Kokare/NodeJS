const mongoose = require('mongoose');

const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://samadhankokare1999:rQqT4BJo2KhVkrsn@samadhankokare.0fv47.mongodb.net/');
}
module.exports = connectDB;
