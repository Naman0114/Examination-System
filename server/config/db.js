const mongoose = require('mongoose');

const connectDB = async () => {

  return await mongoose.connect("mongodb+srv://naman:12345@cluster1.qgh7o.mongodb.net/Online-Exam").then(() =>
    console.log(" DB Connected Successfully")).catch(() => { console.log("DB Not connected successfully") });
}


module.exports = connectDB;