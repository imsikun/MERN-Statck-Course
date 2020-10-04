const mongoose = require('mongoose')
const user = require('./user')

const { ObjectId } = mongoose.Schema

const productCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Product'
  },
  name: String,
  count: Number,
  price: Number
})

const productCart = mongoose.model('ProductCart', productCartSchema)

const orderSchema = new mongoose.Schema(
  {
    products: [productCartSchema],
    transaction_id: {},
    amount: {
      type: Number
    },
    address: {
      type: String
    },
    status: {
      type: String,
      default: 'Received',
      enum: ['Cancelled', 'Delivered', 'Shipped', 'Processing', 'Received']
    },
    update: Date,
    user: {
      type: ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

const Order = mongoose.model('Order', orderSchema)

module.exports = {
  productCart,
  Order
}
