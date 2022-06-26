const mongoose = require('mongoose')

const productModel = mongoose.model('product', new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String
}, {
  collection: 'products'
}))

const categoryModel = mongoose.model('category', new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  order: Number
}, {
  collection: 'categories'
}))

const loginModel = mongoose.model('login', new mongoose.Schema({
  login: String,
  password: String
}, {
  collection: 'login'
}))

const orderModel = mongoose.model('order', new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  orderStatus: { type: String, required: true },
  totalValue: { type: Number, required: true },
  clientName: { type: String, required: true },
  clientPhone: { type: String, required: true },
  clientAddress: { type: String, required: true },
  clientAddressNumber: { type: String, required: true },
  clientAddressData: String,
  paymentType: { type: String, required: true },
  cashChange: Number,
  cardFlag: String,
  products: { type: Array, required: true },
}, {
  collection: 'order'
}))

module.exports = {
  productModel,
  categoryModel,
  loginModel,
  orderModel
}