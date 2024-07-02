require('../models')
const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')

const BASE_URL = '/api/v1/purchase'
let TOKEN, product, purchase

beforeAll(async () => {
    const login = {
        email: 'agonzalez@gmail.com',
        password: '000111'
    }

    const res = await request(app)
        .post('/api/v1/users/login')
        .send(login)

    TOKEN = res.body.token

    product = await Product.create(   product = {
        title: 'TV',
        description: 'Samsung - 65" Class S90C OLED 4K UHD Smart Tizen TV',
        price: 1599,
        // categoryId: category.id
    });

    purchase = {
        quantity: 3,
        productId: product.id,
        userId: res.body.id
    };
});

afterAll(async () => {
    await product.destroy()
})

test("POST -> 'BASE_URL' should return 201 and res.body.purchase.userid === purchase.userId", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(purchase)

    expect(res.statusCode).toBe(201) 
    expect(res.body).toBeDefined()
    expect(res.body.userId).toBe(purchase.userId)
});

test("GET --> 'BASE_URL/' should return 200 and res.body..purchase.userid === purchase.userId", async () =>{
    const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.userId).toBe(purchase.userId)
});

