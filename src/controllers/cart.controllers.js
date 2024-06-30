const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');



const getAll = catchError(async (req, res) => {
    const userId = req.user.id //from class notes
    const results = await Cart.findAll({
        where: { userId },
        include: [
            {
                model: Product,
                attributes: { exclude: ["createdAt", "updatedAt"] },        //another way to only show ceratin attributes is just to enumerating them 
                include: [
                    {
                        model: Category,
                        attributes: ['name']
                    }
                ]

            }
        ]
    });
    return res.json(results);
});


const create = catchError(async (req, res) => {
    const { quantity, productId } = req.body //destructure  req.body
    const userId = req.user.id
    const body = { userId, quantity, productId }
    const result = await Cart.create(body);
    return res.status(201).json(result);
});


const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id //authentication
    const result = await Cart.findByPk(id, {
        where: { userId }, // when user id matches will return the specified attributes
        include: [
            {
                model: Product,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                // to send only specific attribute we can enumarate themby 
                // attributes: ['yyyy','zzzz']
                include: [
                    {
                        model: Category,
                        attributes: ['name']
                    }
                ]
            }
        ]
    });
    if (!result) return res.sendStatus(404);
    return res.json(result);
});


//quantity, productId, userId, id, timestamp
const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Cart.destroy({ where: { id, userId: req.user.id} });
    if (!result) return res.sendStatus(404);
    return res.sendStatus(204);
});


const update = catchError(async (req, res) => {
    const userId = req.user.id //valid auth
    const { id } = req.params;
    const { quantity } = req.body
    const result = await Cart.update({quantity},
        { where: { id, userId }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}