const express = require('express')
const router = express.Router()
const { districtModel } = require('../models')
const ObjectId = require('mongoose').Types.ObjectId;
const auth = require('../middleware/auth')

router.get('/districts', auth, async (req, res) => {
  const districts = await districtModel.find()
  if(districts) {
    res.status(200).json(districts)
  } else {
    res.status(404).json({
      message: 'Nenhum bairro foi encontrado'
    })
  }
})

router.get('/district', auth, async (req, res) => {
  const { _id } = req.query

  if(_id) {
    const district = await districtModel.findOne({ _id: new ObjectId(_id) })

    if(district) {
      res.status(200).json(district)
    } else {
      res.status(404).json({
        message: 'Bairro não encontrado'
      })
    }
  } else {
    res.status(400).json({
      message: 'Erro de validação'
    })
  }
})

router.get('/district/name', auth, async (req, res) => {
  try {
    const { value } = req.query
  
    if(value) {
      const district = await districtModel.findOne({ 
        value: value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(" ").join("")
        .trim()
        .toLocaleUpperCase()
      })
  
      if(district) {
        res.status(200).json(district)
      } else {
        res.status(404).json({
          message: 'Bairro não encontrado'
        })
      }
    } else {
      res.status(400).json({
        message: 'Erro de validação'
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/district', auth, async (req, res) => {
  const { name, price } = req.body

  if(name && price) {
    const value = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(" ").join("")
    .trim()
    .toLocaleUpperCase()

    const result = await districtModel.create({
      name,
      price,
      value
    })

    if(result) {
      res.status(201).json(result)
    }
  } else {
    res.status(400).json({
      message: 'Erro de validação'
    })
  }
})

router.put('/district', auth, async (req, res) => {
  const { _id, name, price } = req.body

  if(_id && name && price) {
    const district = await districtModel.findOne({ _id: new ObjectId(_id) })
  
    if(district) {
      const value = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(" ").join("")
      .trim()
      .toLocaleUpperCase()

      const result = await districtModel.findOneAndUpdate({
        _id
      }, {
        name,
        price,
        value
      }, {
        new: true
      })
  
      if(result) {
        res.status(200).json(result)
      }
    } else {
      res.status(404).json({
        message: 'Bairro não encontrado'
      })
    }
  } else {
    res.status(400).json({
      message: 'Erro de validação'
    })
  }
})

router.delete('/district', auth, async (req, res) => {
  const { _id } = req.body

  if(_id) {
    const district = await districtModel.findOneAndRemove({ _id: new ObjectId(_id) })

    if(district) {
      res.status(200).json(district)
    } else {
      res.status(404).json({
        message: 'Bairro não encontrado'
      })
    }
  } else {
    res.status(400).json({
      message: 'Erro de validação'
    })
  }
})

module.exports = router