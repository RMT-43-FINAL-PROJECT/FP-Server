const request = require('supertest')
const app = require('../app')
const { client } = require('../configs/mongodb')
const { hashPassword } = require('../helpers/bcryptjs')
const { signToken } = require('../helpers/jwt')
const { ObjectId } = require('mongodb')

let idUser1
let idUser2
let access_token_admin
let access_token_sales
beforeAll(async () => {
    await client.connect()
    const testDb = client.db('fp-rmt-43-test')
    let hashPwd = hashPassword("12345")
    let seedingAdmin = await testDb.collection('users').insertOne({
        name: `Admin`,
        photo: 'https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg',
        joinDate: "2024-01-17T13:27:58.398Z",
        email: `admin@gmail.com`,
        password: hashPwd,
        mobilePhone: `081927380033`,
        address: `Indonesia`,
        role: "admin",
        createdAt: "2024-01-17T13:27:58.398Z",
        updatedAt: "2024-01-17T13:27:58.398Z",
    })
    idUser1 = seedingAdmin.insertedId

    let seedingSales = await testDb.collection('users').insertOne({
        name: `Sales`,
        photo: 'https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg',
        joinDate: "2024-01-17T13:27:58.398Z",
        email: `sales@gmail.com`,
        password: hashPwd,
        mobilePhone: `082309330022`,
        address: `Indonesia`,
        role: "sales",
        createdAt: "2024-01-17T13:27:58.398Z",
        updatedAt: "2024-01-17T13:27:58.398Z",
    })
    idUser2 = seedingSales.insertedId

    let findSales = await testDb.collection("users").findOne({
        _id: new ObjectId(idUser2)
    })

    access_token_sales = signToken(findSales)
})

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

describe('GET /users/login', () => {
    test('SUCCESS : LOGIN', async () => {
        let dataBody = {
            email: "admin@gmail.com",
            password: "12345",
        }
        const response = await request(app)
            .post('/users/login')
            .send(dataBody)
        access_token_admin = response.body.access_token
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('access_token', expect.any(String))
    })

    test('FAILED : LOGIN - without email', async () => {
        let dataBody = {
            email: "",
            password: "12345",
        }
        const response = await request(app)
            .post('/users/login')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email is required')
    })

    test('FAILED : LOGIN - without password', async () => {
        let dataBody = {
            email: "neymar@gmail.com",
            password: "",
        }
        const response = await request(app)
            .post('/users/login')
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Password is required')
    })

    test('FAILED : LOGIN - wrong email', async () => {
        let dataBody = {
            email: "neymar111@gmail.com",
            password: "12345",
        }
        const response = await request(app)
            .post('/users/login')
            .send(dataBody)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Invalid email/password')
    })

    test('FAILED : LOGIN - wrong password', async () => {
        let dataBody = {
            email: "neymar@gmail.com",
            password: "1234522222",
        }
        const response = await request(app)
            .post('/users/login')
            .send(dataBody)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Invalid email/password')
    })
})

describe('GET /users/finduser-email', () => {
    test('SUCCESS : FIND USER BY EMAIL', async () => {
        let dataBody = {
            email: "neymar@gmail.com",
        }
        const response = await request(app)
            .get('/users/finduser-email')
            .set('Authorization', `Bearer ${access_token_admin}`)
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
            .set('Authorization', `Bearer ${access_token_admin}`)
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
            .set('Authorization', `Bearer ${access_token_admin}`)
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
            .set('Authorization', `Bearer ${access_token_admin}`)
            .send(dataBody)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email is required')
    })

    test('FAILED : FIND USER BY EMAIL - without send email', async () => {
        const response = await request(app)
            .get('/users/finduser-email')
            .set('Authorization', `Bearer ${access_token_admin}`)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email is required')
    })
})

describe('GET /users/:idUser', () => {
    test('SUCCESS : FIND USER BY ID PARAMS ', async () => {
        const response = await request(app)
            .get(`/users/finduser/${idUser1}`)
            .set('Authorization', `Bearer ${access_token_admin}`)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toMatchObject({
            _id: expect.any(String),
            name: "Admin",
            photo: 'https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg',
            joinDate: expect.any(String),
            email: `admin@gmail.com`,
            mobilePhone: `081927380033`,
            address: `Indonesia`,
            role: "admin",
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        })
    })

    test('FAILED : FIND USER BY ID PARAMS - not found', async () => {
        const response = await request(app)
            .get(`/users/finduser/65a7818f64e52af4a8c7027b`)
            .set('Authorization', `Bearer ${access_token_admin}`)
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'No user found with this ID')
    })

    test('FAILED : FIND USER BY ID PARAMS - invalid token', async () => {
        const response = await request(app)
            .get(`/users/finduser/65a7818f64e52af4a8c7027b`)
            .set('Authorization', ``)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Invalid Token')
    })

    test('FAILED : FIND USER BY ID PARAMS - invalid token 2', async () => {
        const response = await request(app)
            .get(`/users/finduser/65a7818f64e52af4a8c7027b`)
            .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE3ZDVkZWU5MzVjZjc3MzAwODg2OGEiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNTUwNDE5Molp-IRYmlD6kwJ8BvZEg-8XBs2UXwV2I4-87gzb4Q`)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Invalid Token')
    })

    test('FAILED : FIND USER BY ID PARAMS - invalid token 3', async () => {
        const response = await request(app)
            .get(`/users/finduser/65a7818f64e52af4a8c7027b`)
            .set('Authorization', `notBearer ${access_token_admin}`)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Invalid Token')
    })

    test('FAILED : FIND USER BY ID PARAMS - forbidden access', async () => {
        const response = await request(app)
            .get(`/users/finduser/65a7818f64e52af4a8c7027b`)
            .set('Authorization', `Bearer ${access_token_sales}`)
        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Forbidden Access. Admin only')
    })
})

describe('GET /users', () => {
    test('SUCCESS : FIND ALL USERS', async () => {
        const response = await request(app)
        .get(`/users`)
        .set('Authorization', `Bearer ${access_token_admin}`)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })
})