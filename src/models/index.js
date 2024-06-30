const Cart = require('./Cart')
const Category = require('./Category')
const Product = require('./Product')
const Purchase = require('./Purchase')
const User = require('./User')

// require('./Product')

// Category relationship with productId
Product.belongsTo(Category)
Category.hasMany(Product)

// Cart relationship with userId
//Cart -> userId
Cart.belongsTo(User)
User.hasMany(Cart)


// Product relationship with cart
Cart.belongsTo(Product)
Product.hasMany(Cart)

// Purchase  relationship with userId
Purchase.belongsTo(User)
User.hasMany(Purchase)

// Purchase relationship with productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)

