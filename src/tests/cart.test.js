require('../models')
const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')


const BASE_URL = '/api/v1/cart'
let TOKEN, cart, product, cartId

beforeAll(async () => {

    const login = {
        email: 'agonzalez@gmail.com',
        password: '000111'
    }

    const res = await request(app)
        .post('/api/v1/users/login')
        .send(login)

    TOKEN = res.body.token

    product = await Product.create({
        title: "Klein Tools Multi-Meter",
        description: "Klein Tools 600-Volt Digital Multi-Meter, Manual-Ranging",
        price: "35"
    })

    cart = {
        quantity: 5,
        productId: product.id

    }

})

afterAll(async () => {
    await product.destroy()
})


test("POST -> 'BASE_URL' should return statusCode 201, res.body.quantity === cart.quantity", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(cart)

    cartId = res.body.id // cart id from post cart  from the send

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBeGreaterThan(0)

})


test("GET -> 'BASE_URL' should return statusCode 200 and res.body.length == 1", async () => {

    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

})


test("GET -> 'BASE_URL/:id' should return statusCode 200 and res.body.quantity === cart.quantity", async () => {

    const res = await request(app)
        .get(`${BASE_URL}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)


})


test("PUT -> 'BASE_URL/:id' should return statusCode 200 and red.body.quantity === cartUpdate.quantity", async () => {

    const cartUpdate = {
        quantity: 1,
    }

    const res = await request(app)
        .put(`${BASE_URL}/${cartId}`)
        .send(cartUpdate)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cartUpdate.quantity)

})

test("Delete 'BASE_URL/:id', must return statusCode 204", async () => {

    const res = await request(app)
        .delete(`${BASE_URL}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)

}) 