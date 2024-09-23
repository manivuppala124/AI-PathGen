const mongoose = require('mongoose');

const connectDB =async () => {
    try{
        await mongoose.connect('mongodb+srv://manikantavuppala124:manivuppala124@cluster0.d7m6k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("connected success")
    }
    catch(err){
console.log("mongo db error",err);
    }
}
 
export default connectDB;