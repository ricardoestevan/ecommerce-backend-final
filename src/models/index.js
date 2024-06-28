const Cart = require('./Cart')
const Category = require('./Category')
const Product = require('./Product')
const User = require('./User')

// require('./Product')

// Category relationship
Product.belongsTo(Category)
Category.hasMany(Product)

// Cart relationship
//Cart -> userId
Cart.belongsTo(User)
User.hasMany(Cart)


// Product relationship
Cart.belongsTo(Product)
Product.hasMany(Cart)