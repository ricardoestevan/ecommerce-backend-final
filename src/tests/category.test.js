
const request = require('supertest')
const app = require('../app')
const BASE_URL = '/api/v1/categories'


let TOKEN
let categoryId

beforeAll(async () => {

    const login = {
        email: 'agonzalez@gmail.com',
        password: '000111'
    }

    const res = await request(app)
        .post('/api/v1/users/login')
        .send(login)

    TOKEN = res.body.token

})


test("Post 'BASE_URL',  must  return  status  20  &  category.name === res.body.name", async () => {

    const category = {
        name: "Game Console"
    }
    

    const res = await request(app)
        .post(BASE_URL)
        .send(category)
        .set('Authorization', `Bearer ${TOKEN}`)

    categoryId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)

})


test("Get 'BASE_URL', must  return  status 200  & res.body.length == 1", async () => {

    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

})


test("Delete 'BASE_URL/:id', must return status 204", async () => {

    const res = await request(app)
        .delete(`${BASE_URL}/${categoryId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)

}) 