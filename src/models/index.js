const Category = require('./Category')
const Product = require('./Product')

require('./User')
// require('./Product')

Product.belongsTo(Category)
Category.hasMany(Product)
