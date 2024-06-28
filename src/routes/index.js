const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const { verify } = require('jsonwebtoken');
const routerCart = require('./cart.router');
const { verifyJwt } = require('../utils/verifyJwt');
const router = express.Router();

// Place routes here
router.use('/users', routerUser)            //user route
router.use('/categories', routerCategory)   //category route
router.use('/products', routerProduct)      //product route
router.use('/carts', verifyJwt, routerCart)    //cart route verifyJwt placed here to protect the whole route to avoid protecting routes individually

module.exports = router;