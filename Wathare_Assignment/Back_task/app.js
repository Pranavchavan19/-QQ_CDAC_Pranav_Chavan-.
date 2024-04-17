const fs = require("fs");
const Tasks = require("./Routes/task")
const express  = require("express")
const cors = require("cors");
const connectDB = require("./db/connect");
const bodyparser = require('body-parser')
const app = express() 
const Task = require("./model/Task")
const mongoose = require("mongoose")
require('dotenv').config()
// middleware
app.use(bodyparser.json())
app.use(cors())
// const stream = fs.createReadStream("sample-data.json");

// stream.on("data", (data) => {
//     console.log(data.toString());
// }); 

app.use('/api/samples',Tasks)

const PORT = 5000
mongoose.connect(process.env.Mongo_URI).then(() => console.log('db connected'))

const data = JSON.parse(fs.readFileSync('sample-data.json', 'utf-8'))
console.log(data)
app.get('/',(req,res)=>
{
    res.send("hello")
})
const importData = async () => {
    try {
      await Task.create(data)
      console.log('data successfully imported')
      // to exit the process
      process.exit()
    } catch (error) {
      console.log('error', error)
    }
  }

  importData()

  // app.get('/api/samples', async (req, res) => {
  //   try {
  //   const samples = await Task.find();
  //   res.json(samples);
  //   } catch (error) {
  //   res.status(500).json({ error: error.message });
  //   }
  //  });

  app.listen(PORT,"localhost",() => {
    console.log(`Server is running on port ${PORT}`);
   });
   
  
// const start =  async () =>
// {
//     try{
//         await connectDB(process.env.Mongo_URI)
//         app.listen(port,console.log(`Server is running on port ${port}`))
//     }catch(err)
//     {
//         console.log(err)
//     }
// }
// start()

