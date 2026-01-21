// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const TodoModel = require('./models/Todo');

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://127.0.0.1:27017/TODO',
//     console.log('MongoDB connected')
// )

// app.listen(5030,
//     console.log('Server listening on port: 5030')
// )

// app.post('/add', (req, res) => {
//   const { task } = req.body;
//   TodoModel.create({ task })
//       .then(result => res.json(result))
//       .catch(err => console.log(err));
   
// });

// app.get('/get',(req,res)=>{
//   TodoModel.find()
//   .then(result=> res.json(result))
//   .catch(err=>console.log(err));
// });
  
// app.put('/edit/:id',(req,res)=>{
//   const{id} = req.params;
//   TodoModel.findByIdAndUpdate(id,{done:true},{new:true})
//   .then(result=> res.json(result))
//   .catch(err=>res.json(err));
//  });

// app.put('/update/:id',(req,res)=>{
//   const{id} = req.params;
//   const{task} = req.body;
//   TodoModel.findByIdAndUpdate(id,{task:task})
//   .then(result=> res.json(result))
//   .catch(err=>res.json(err));
//  });

// app.delete('/delete/:id',(req,res)=>{
//   const{id} = req.params;
//   TodoModel.findByIdAndDelete({_id:id})
//   .then(result=> res.json(result))
//   .catch(err=>res.json(err));
//  }); 

// module.exports=app;


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const TodoModel = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.post('/add', (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  TodoModel.findByIdAndUpdate(id, { task }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
