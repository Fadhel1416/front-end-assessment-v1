const express = require('express');
var cors = require('cors')
const Model = require('../model/model');
const router = express.Router()
var corsOptions = {
    origin: 'https://testtechniqye-100.herokuapp.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
//Post Method
router.post('/product/add', async(req, res) => {
   
    const data = new Model(req.body);
    console.log(req.body);
    if(data) {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    else{
        res.status(400).json({message:" error  in add product"})
    }
})

//Get all Method
router.get('/getProduct',cors(corsOptions),async (req, res) => {
    try{
        const data = await Model.find();

        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/product/get/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method;you can use patch or put 
router.put('/product/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )
        res.status(200).json(result)

        //res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;