const request = require('supertest')
const app = require('../app')
const { client } = require('../configs/mongodb')
const { hashPassword } = require('../helpers/bcryptjs')
const { signToken } = require('../helpers/jwt')
const { ObjectId } = require('mongodb')
const path = require("path");
const fs = require("fs");

let idUser1
let idUser2
let access_token_admin
let access_token_sales
const filePath = path.resolve(__dirname, "../asset/wibu.jpg");
const imageBuffer = fs.readFileSync(filePath)
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
    let seedingSales = await testDb.collection('users').insertOne({
        name: `Sales`,
        photo: 'https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg',
        joinDate: "2024-01-17T13:27:58.398Z",
        email: `sales@gmail.com`,
        password: hashPwd,
        mobilePhone: `081927380033`,
        address: `Indonesia`,
        role: "sales",
        createdAt: "2024-01-17T13:27:58.398Z",
        updatedAt: "2024-01-17T13:27:58.398Z",
    })
    idUser1 = seedingAdmin.insertedId
    let findUser = await testDb.collection("users").findOne({
        _id: new ObjectId(idUser1)
    })
    access_token_admin = signToken(findUser)
    idUser2 = seedingSales.insertedId
    let findUser2 = await testDb.collection("users").findOne({
        _id: new ObjectId(idUser2)
    })
    access_token_sales = signToken(findUser2)

    const inputP1 = {
        name: "ponds",
        image:
            "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        category: "Beauty & Wellbeing",
        stock: 999,
        price: 123221,
        discQty: 20,
        discPercent: 1,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const inputP2 = {
        name: "Citra",
        image:
            "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        category: "Beauty & Wellbeing",
        stock: 10000,
        price: 32000,
        discQty: 10,
        discPercent: 5,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    let seedProducts1 = await testDb.collection("products").insertOne(inputP1);
    idProduct1 = seedProducts1.insertedId;
    let seedProducts2 = await testDb.collection("products").insertOne(inputP2);
    idProduct2 = seedProducts2.insertedId;
})

afterAll(async () => {
    try {
        await client.connect()
        const testDb = client.db('fp-rmt-43-test')
        await testDb.collection("products").deleteMany({});
        await testDb.collection('users').deleteMany({})
    } finally {
        await client.close()
    }
})

describe("GET /products", () => {
    test("Success return list products", async () => {
        const response = await request(app)
            .get("/products")
            .set("Authorization", `Bearer ${access_token_sales}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toBeInstanceOf(Object);
        expect(response.body[0]).toHaveProperty("_id", expect.any(String));
        expect(response.body[0]).toHaveProperty("name", expect.any(String));
        expect(response.body[0]).toHaveProperty("image", expect.any(String));
        expect(response.body[0]).toHaveProperty("category", expect.any(String));
        expect(response.body[0]).toHaveProperty("stock", expect.any(Number));
        expect(response.body[0]).toHaveProperty("price", expect.any(Number));
        expect(response.body[0]).toHaveProperty("discQty", expect.any(Number));
        expect(response.body[0]).toHaveProperty("discPercent", expect.any(Number));
        expect(response.body[0]).toHaveProperty("isAvailable", expect.any(Boolean));
    });
    test("Success return list products with query available params true", async () => {
        const response = await request(app)
            .get("/products?available=true")
            .set("Authorization", `Bearer ${access_token_sales}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toBeInstanceOf(Object);
        expect(response.body[0]).toHaveProperty("_id", expect.any(String));
        expect(response.body[0]).toHaveProperty("name", expect.any(String));
        expect(response.body[0]).toHaveProperty("image", expect.any(String));
        expect(response.body[0]).toHaveProperty("category", expect.any(String));
        expect(response.body[0]).toHaveProperty("stock", expect.any(Number));
        expect(response.body[0]).toHaveProperty("price", expect.any(Number));
        expect(response.body[0]).toHaveProperty("discQty", expect.any(Number));
        expect(response.body[0]).toHaveProperty("discPercent", expect.any(Number));
        expect(response.body[0]).toHaveProperty("isAvailable", true);
    });
    test("Invalid token", async () => {
        const response = await request(app)
            .get("/products")
            .set("Authorization", `Bearer dwdw`);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);

    });
});

describe("GET /products/:id", () => {
    test("Success return detail product", async () => {
        const response = await request(app)
            .get(`/products/${idProduct1}`)
            .set("Authorization", `Bearer ${access_token_sales}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("_id", expect.any(String));
        expect(response.body).toHaveProperty("name", expect.any(String));
        expect(response.body).toHaveProperty("image", expect.any(String));
        expect(response.body).toHaveProperty("category", expect.any(String));
        expect(response.body).toHaveProperty("stock", expect.any(Number));
        expect(response.body).toHaveProperty("price", expect.any(Number));
        expect(response.body).toHaveProperty("discQty", expect.any(Number));
        expect(response.body).toHaveProperty("discPercent", expect.any(Number));
        expect(response.body).toHaveProperty("isAvailable", expect.any(Boolean));
    });
    test("Failed with wrong ID should return message", async () => {
        const falseId = `65a7ee0845ca2a04fba0a0qq`;
        const response = await request(app)
            .get(`/products/${falseId}`)
            .set("Authorization", `Bearer ${access_token_sales}`);

        expect(response.status).toBe(500);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
    });
    test("Invalid token", async () => {
        const response = await request(app)
            .get("/products")
            .set("Authorization", `Bearer dwdw`);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
    });
});

describe("POST /products", () => {
    test("Success create products", async () => {
        const newProduct = {
            name: "sunsild",
            category: "Beauty & Wellbeing",
            stock: 9992,
            price: 1232221,
            discQty: 202,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
    });
    test("authorization admin", async () => {
        const newProduct = {
            name: "sunsild",
            category: "Beauty & Wellbeing",
            stock: 9992,
            price: 1232221,
            discQty: 202,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${access_token_sales}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(403);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
    });
    test("catch error", async () => {
        const newProduct = {
            name: "sunsild",
            category: "Beauty & Wellbeing",
            stock: 9992,
            price: 1232221,
            discQty: 202,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(500);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
    });
    test("required name", async () => {
        const newProduct = {
            name: "",
            category: "Beauty & Wellbeing",
            stock: 9992,
            price: 1232221,
            discQty: 202,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Name is required');
    });
    test("required category", async () => {
        const newProduct = {
            name: "dove",
            category: "",
            stock: 9992,
            price: 1232221,
            discQty: 202,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Category is required');
    });
    test("required stock", async () => {
        const newProduct = {
            name: "dove",
            category: "Beauty & Wellbeing",
            stock: '',
            price: 1232221,
            discQty: 202,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Stock is required');
    });
    test("required price", async () => {
        const newProduct = {
            name: "dove",
            category: "Beauty & Wellbeing",
            stock: 23321,
            price: ``,
            discQty: 202,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Price is required');
    });
    test("required discQty", async () => {
        const newProduct = {
            name: "dove",
            category: "Beauty & Wellbeing",
            stock: 23321,
            price: 20000,
            discQty: ``,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'DiscQty is required');
    });
    test("required discPercent", async () => {
        const newProduct = {
            name: "dove",
            category: "Beauty & Wellbeing",
            stock: 23321,
            price: 20000,
            discQty: 25,
            discPercent: ``,
            isAvailable: true,
        };
        const response = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'DiscPercent is required');
    });
    test("required isAvailable", async () => {
        const newProduct = {
            name: "dove",
            category: "Beauty & Wellbeing",
            stock: 23321,
            price: 20000,
            discQty: 25,
            discPercent: 12,
            isAvailable: ``,
        };
        const response = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'IsAvailable is required');
    });
});

describe("PUT /products/:id", () => {
    test("Success edit products", async () => {
        const newProduct = {
            name: "dove",
            category: "Beauty & Wellbeing",
            stock: 2,
            price: 20000,
            discQty: 25,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .put(`/products/${idProduct1}`)
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
    });
    test("authorization admin", async () => {
        const newProduct = {
            name: "sunsild",
            category: "Beauty & Wellbeing",
            stock: 9992,
            price: 1232221,
            discQty: 202,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .put(`/products/${idProduct1}`)
            .set("Authorization", `Bearer ${access_token_sales}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(403);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
    });
    test("Product not found", async () => {
        const invalidProductId = `65ace3a6602071781fb1c15a`
        const newProduct = {
            name: "sunsild",
            category: "Beauty & Wellbeing",
            stock: 9992,
            price: 1232221,
            discQty: 202,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .put(`/products/${invalidProductId}`)
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Product Not Found');
    });
    test("catch error", async () => {
        const newProduct = {
            name: "sunsild",
            category: "Beauty & Wellbeing",
            stock: 9992,
            price: 1232221,
            discQty: 202,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .put(`/products/${idProduct1}`)
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(500);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
    });
    test("required name", async () => {
        const newProduct = {
            name: "",
            category: "Beauty & Wellbeing",
            stock: 9992,
            price: 1232221,
            discQty: 202,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .put(`/products/${idProduct1}`)
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Name is required');
    });
    test("required category", async () => {
        const newProduct = {
            name: "dove",
            category: "",
            stock: 9992,
            price: 1232221,
            discQty: 202,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .put(`/products/${idProduct1}`)
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Category is required');
    });
    test("required stock", async () => {
        const newProduct = {
            name: "dove",
            category: "Beauty & Wellbeing",
            stock: '',
            price: 1232221,
            discQty: 202,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .put(`/products/${idProduct1}`)
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Stock is required');
    });
    test("required price", async () => {
        const newProduct = {
            name: "dove",
            category: "Beauty & Wellbeing",
            stock: 23321,
            price: ``,
            discQty: 202,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .put(`/products/${idProduct1}`)
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Price is required');
    });
    test("required discQty", async () => {
        const newProduct = {
            name: "dove",
            category: "Beauty & Wellbeing",
            stock: 23321,
            price: 20000,
            discQty: ``,
            discPercent: 12,
            isAvailable: true,
        };
        const response = await request(app)
            .put(`/products/${idProduct1}`)
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'DiscQty is required');
    });
    test("required discPercent", async () => {
        const newProduct = {
            name: "dove",
            category: "Beauty & Wellbeing",
            stock: 23321,
            price: 20000,
            discQty: 25,
            discPercent: ``,
            isAvailable: true,
        };
        const response = await request(app)
            .put(`/products/${idProduct1}`)
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'DiscPercent is required');
    });
    test("required isAvailable", async () => {
        const newProduct = {
            name: "dove",
            category: "Beauty & Wellbeing",
            stock: 23321,
            price: 20000,
            discQty: 25,
            discPercent: 12,
            isAvailable: ``,
        };
        const response = await request(app)
            .put(`/products/${idProduct1}`)
            .set("Authorization", `Bearer ${access_token_admin}`)
            .field("name", newProduct.name)
            .field("category", newProduct.category)
            .field("stock", newProduct.stock)
            .field("price", newProduct.price)
            .field("discQty", newProduct.discQty)
            .field("discPercent", newProduct.discPercent)
            .field("isAvailable", newProduct.isAvailable)
            .attach("image", imageBuffer, "wibu.jpg");

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'IsAvailable is required');
    });
});

describe("DELETE /products/:id", () => {
    test("Success delete product", async () => {
        const response = await request(app)
            .delete(`/products/${idProduct1}`)
            .set("Authorization", `Bearer ${access_token_admin}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
    });

    test("Invalid token", async () => {
        const response = await request(app).delete(`/products/${idProduct1}`);

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
    });
    test("authorization admin", async () => {
        const response = await request(app)
            .delete(`/products/${idProduct1}`)
            .set("Authorization", `Bearer ${access_token_sales}`);

        expect(response.status).toBe(403);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", expect.any(String));
    });
    test("Product not found", async () => {
        const invalidProductId = `65ace3a6602071781fb1c15a`
        const response = await request(app)
            .delete(`/products/${invalidProductId}`)
            .set("Authorization", `Bearer ${access_token_admin}`);

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", 'Product Not Found');
    });
});