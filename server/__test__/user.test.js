const request = require('supertest')
const app = require('../app')
const fs = require('fs')
const { client } = require('../configs/mongodb')

afterAll(async () => {
    try {
        await client.connect()
        const testDb = client.db('fp-rmt-43-test')
        await testDb.collection('users').deleteMany({})
    } finally {
        await client.close()
    }
})

describe('GET /', () => {
    test('TESTING HOME', async () => {
        const response = await request(app)
            .get('/')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message', "Server is running...")
    })
})

describe('POST /users/register', () => {
    test('SUCCESS : REGISTER', async () => {
        let dataBody = {
            name: "neymar",
            email: "neymar@gmail.com",
            password: "12345",
            mobilePhone: "081937380022",
            address: "Brazil"
        }
        const response = await request(app)
            .post('/users/register')
            .send(dataBody)
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('email')
        expect(response.body).toHaveProperty('address')
        expect(response.body).toHaveProperty('role', 'sales')
        expect(response.body).toHaveProperty('message', 'Register Successfully')
        expect(response.body).toHaveProperty('mobilePhone')
    })

    test('FAILED : REGISTER - Email already exists', async () => {
        let dataBody = {
            name: "neymar",
            email: "neymar@gmail.com",
            password: "12345",
            mobilePhone: "081937380022",
            address: "Brazil"
        }
        const response = await request(app)
            .post('/users/register')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', "This email has already been registered")
    })

    test('FAILED : REGISTER - empty name', async () => {
        let dataBody = {
            name: "",
            email: "neymar2@gmail.com",
            password: "12345",
            mobilePhone: "081937380022",
            address: "Brazil"
        }
        const response = await request(app)
            .post('/users/register')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', "Name is required")
    })

    test('FAILED : REGISTER - empty email', async () => {
        let dataBody = {
            name: "neymar",
            email: "",
            password: "12345",
            mobilePhone: "081937380022",
            address: "Brazil"
        }
        const response = await request(app)
            .post('/users/register')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', "Email is required")
    })

    test('FAILED : REGISTER - empty password', async () => {
        let dataBody = {
            name: "neymar",
            email: "neymar2@gmail.com",
            password: "",
            mobilePhone: "081937380022",
            address: "Brazil"
        }
        const response = await request(app)
            .post('/users/register')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', "Password is required")
    })

    test('FAILED : REGISTER - empty mobilePhone', async () => {
        let dataBody = {
            name: "neymar",
            email: "neymar2@gmail.com",
            password: "12345",
            mobilePhone: "",
            address: "Brazil"
        }
        const response = await request(app)
            .post('/users/register')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', "Mobile Phone is required")
    })

    test('FAILED : REGISTER - empty address', async () => {
        let dataBody = {
            name: "neymar",
            email: "neymar2@gmail.com",
            password: "12345",
            mobilePhone: "081920333334",
            address: ""
        }
        const response = await request(app)
            .post('/users/register')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', "Address is required")
    })

    test('FAILED : REGISTER - invalid Email', async () => {
        let dataBody = {
            name: "neymar",
            email: "neymar2gmail.com",
            password: "12345",
            mobilePhone: "082309449090",
            address: "brazil"
        }
        const response = await request(app)
            .post('/users/register')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email is invalid')
    })

    test('FAILED : REGISTER - name less than 3 characters', async () => {
        let dataBody = {
            name: "ner",
            email: "neymar2@gmail.com",
            password: "12345",
            mobilePhone: "082309449090",
            address: "Brazil"
        }
        const response = await request(app)
            .post('/users/register')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Name must be at least 4 characters')
    })

    test('FAILED : REGISTER - mobile phone invalid', async () => {
        let dataBody = {
            name: "nemaar",
            email: "neymar2@gmail.com",
            password: "12345",
            mobilePhone: "111118134",
            address: "Brazil"
        }
        const response = await request(app)
            .post('/users/register')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Mobile Phone is invalid')
    })

    test('FAILED : REGISTER - without send name', async () => {
        let dataBody = {
            email: "neymar2@gmail.com",
            password: "12345",
            mobilePhone: "111118134",
            address: "Brazil"
        }
        const response = await request(app)
            .post('/users/register')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', "Missing required fields")
    })
})

describe('GET /users/finduser-email', () => {
    test('SUCCESS : FIND USER BY EMAIL', async () => {
        let dataBody = {
            email: "neymar@gmail.com",
        }
        const response = await request(app)
            .get('/users/finduser-email')
            .send(dataBody)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toMatchObject({
            _id: expect.any(String),
            name: "neymar",
            photo: expect.any(String),
            joinDate: expect.any(String),
            email: "neymar@gmail.com",
            mobilePhone: "081937380022",
            address: "Brazil",
            role: "sales",
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        })
    })

    test('FAILED : FIND USER BY EMAIL - cannot find that email', async () => {
        let dataBody = {
            email: "neymar3@gmail.com",
        }
        const response = await request(app)
            .get('/users/finduser-email')
            .send(dataBody)
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'No user found with this email')
    })

    test('FAILED : FIND USER BY EMAIL - email invalid', async () => {
        let dataBody = {
            email: "neymargmail.com",
        }
        const response = await request(app)
            .get('/users/finduser-email')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email is invalid')
    })

    test('FAILED : FIND USER BY EMAIL - email is empty', async () => {
        let dataBody = {
            email: "",
        }
        const response = await request(app)
            .get('/users/finduser-email')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email is required')
    })

    test('FAILED : FIND USER BY EMAIL - without send email', async () => {
        const response = await request(app)
            .get('/users/finduser-email')
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email is required')
    })
})