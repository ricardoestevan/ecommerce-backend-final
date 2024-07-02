require('../models')
const request = require('supertest')
const app = require('../app')
const Category = require('../models/Category')

const BASE_URL = '/api/v1/products'
let TOKEN, category, product, productId

beforeAll(async () => {

    const login = {
        email: 'agonzalez@gmail.com',
        password: '000111'
    }

    const res = await request(app)
        .post('/api/v1/users/login')
        .send(login)

    TOKEN = res.body.token

    category = await Category.create({
        name: 'Electronics'
    })

    product = {
        title: 'TV',
        description: 'Samsung - 65" Class S90C OLED 4K UHD Smart Tizen TV',
        price: 1599,
        categoryId: category.id
    }
})

afterAll(async () => {
    await category.destroy()
})

test("POST -> 'BASE_URL', should return statusCode 201, res.body.title === product.title'", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(product)

        productId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
    expect(res.body.categoryId).toBe(category.id)
})

test("GET -> 'BASE_URL', should return statusCode 200", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET -> 'BASE_URL/:id', should return statusCode 200 and res.body.title === product.title", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${productId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})

test("PUT -> 'BASE_URL/:id', should return statusCode 200 and res.body.title === productUpdate.title", async() => {
    const productUpdate = {
        title: 'TV',
        description: 'Samsung - 55" Class S90C OLED 4K UHD',
        price: 1200
    }
    const res = await request(app)
        .put(`${BASE_URL}/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(productUpdate)

        expect(res.statusCode).toBe
            expect(res.body).toBeDefined()
    expect(res.body.title).toBe( productUpdate.title )

})

test("DELETE -> 'BASE_URL/:id', must return statusCode 204", async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${ productId }`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
    
})