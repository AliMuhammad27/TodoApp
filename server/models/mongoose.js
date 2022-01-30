const mongoose=require("mongoose")
const dbUrl="mongodb+srv://Ali:Ali123@cluster0.bwyfo.mongodb.net/TodoApp?retryWrites=true&w=majority"
mongoose.connect(dbUrl,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((result)=>{
  console.log("Connected to db")
}).catch((err)=>{console.log(err)})
