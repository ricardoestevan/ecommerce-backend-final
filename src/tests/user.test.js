
    const request = require('supertest')
    const app = require('../app')
    const BASE_URL = '/api/v1/users'
    
    let TOKEN       
    let userId     
    
    beforeAll(async () => {
    
        const login = {
            email    : 'agonzalez@gmail.com',
            password : '000111'
        }
    
        const res = await request(app)
            .post(`${BASE_URL}/login`)
            .send(login)
    
            TOKEN = res.body.token
    
    })
            
            
    const user = {
        firstName: 'Ricardo',
        lastName: 'Gonzalez',
        email: 'rgonzalez@gmail.com',
        password: '000111',
        phone: '9565555555'
    }
            
    test("POST -> 'BASE_URL', should return status 201 & user.firstName === res.body.firstName", async () => {
    
        const res = await request(app)
            .post(BASE_URL)
            .send(user)
    
        userId = res.body.id 
    
        expect(res.status).toBe(201)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe(user.firstName)
    
    })
            
    
    test("GET -> 'BASE_URL', should return status 200 & res.body.length == 2", async () => {
    
        const res = await request(app)
            .get(BASE_URL)
            .set('Authorization', `Bearer ${TOKEN}`)
    
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(2)
    
    })
    
               
    test("PUT -> 'BASE_URL/:id', should return status 200 & res.body.firstName === userUpdate.firstName", async () => {
    
        const userUpdate = {
            firstName: 'Rodrigo',
            lastName: 'Lopez'
        }
    
        const res = await request(app)
            .put(`${BASE_URL}/${userId}`)
            .send(userUpdate)
            .set('Authorization', `Bearer ${TOKEN}`)
    
        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe(userUpdate.firstName)
    
    }) 
    test("POST -> 'BASE_URL/login' should return statusCode 401", async() => {
        const user = {
            email : 'agonzalez@gmail.com',
           password : '123456789'
       }
    
        const res = await request(app)
            .post(`${BASE_URL}/login`)
            .send(user)
        
        expect(res.statusCode).toBe(401)
    })
    
    test("POST -> 'BASE_URL', should return statusCode 200, res.body.user and res.body.token to be defined and res.body.user.email === user.email", async() => {
        const user = {
             email : 'agonzalez@gmail.com',
            password : '000111'
        }
    
        const res = await request(app)
            .post(`${BASE_URL}/login`)
            .send(user)
    
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.token).toBeDefined()
        expect(res.body.user).toBeDefined()
        expect(res.body.user.email).toBe(user.email)
    })
            
    test("DELETE -> 'BASE_URL/:id', must return status 204", async () => {
    
        const res = await request(app)
            .delete(`${BASE_URL}/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
    
        expect(res.status).toBe(204)
    
    }) 
        