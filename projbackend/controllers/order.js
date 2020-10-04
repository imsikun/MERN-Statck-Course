const order = require('../models/order')
const { Order, ProductCart } = require('../models/order')

exports.getorderById = (req, res, next, id) => {
  Order.finById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'No order found in DB'
        })
      }
      req.order = order
      next()
    })
}

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile
  const order = new Order(req.body.order)
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to save your ordrer in DB'
      })
    }
    res.json(order)
  })
}

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate('user', '_id name')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'No orders found in DB'
        })
      }
      res.json(order)
    })
}

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path('status').enumValues)
}

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'Can not update order status'
        })
      }
      res.json(order)
    }
  )
}