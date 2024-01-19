const request = require("supertest");
const app = require("../app");
const { client } = require("../configs/mongodb");
const { ObjectId } = require("mongodb");
const { hashPassword } = require("../helpers/bcryptjs");

let idStore1;
let idStore2;
let idProduct1;
let idProduct2;
let idUser1;
let idUser2;
let idOrder1;
let idOrder2;

beforeAll(async () => {
  await client.connect();
  const testDb = client.db("fp-rmt-43-test");
  //seeding stores
  const inputS1 = {
    name: "Toko Plastik Morodadi Test",
    location: {
      type: "Point",
      coordinates: [112.63070356923028, -7.986860420618447],
    },
    photo:
      "https://lh3.googleusercontent.com/p/AF1QipOE83L2OliXcZV7nczQvFhooFJc7qxtLGb7kYCT=s1360-w1360-h1020",
    joinDate: new Date(),
    address:
      "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
    ownerName: "Bambang",
    mobilePhone: "082222222222",
    status: "confirmed",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const inputS2 = {
    name: "Toko Sumber Rezeki Test",
    location: {
      type: "Point",
      coordinates: [112.61503381426093, -7.9586223893455506],
    },
    photo:
      "https://lh3.googleusercontent.com/gps-proxy/AMy85WJQ23dHYBN-cubJj9_aNOMPJV9AkKG3Ogosc3zBmVrbXnHwWSGuBbmmwCh75KBxZP4TQLPRDTwZFhWcDsVaRrtrQ5k1iB3ZBnQyNUClOn5bURTvVdHy57hJX3rPX3COzvXKkOcgidqfQjvbEaNimp7cHQgq_tj91Y0mO-cGQcURw0_UsYjk7lu2oZt-_k2cy8yDNUs=w260-h175-n-k-no",
    joinDate: new Date(),
    address:
      "Jl. Bend. Sutami 1 No.442, Sumbersari, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145",
    ownerName: "Rizky",
    mobilePhone: "082222222222",
    status: "confirmed",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let seedStores1 = await testDb.collection("stores").insertOne(inputS1);
  idStore1 = seedStores1.insertedId;
  let seedStores2 = await testDb.collection("stores").insertOne(inputS2);
  idStore2 = seedStores2.insertedId;

  //seeding products
  const inputP1 = {
    name: "Indomie Goreng Rendang",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY6K14kytL1CImvzh2gGyZnoXz4ZPFnuIzQg&usqp=CAU",
    category: "Makanan",
    stock: 999,
    price: 117000,
    discQty: 30,
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

  //seeding users
  const inputU1 = {
    name: `Andi`,
    photo:
      "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
    joinDate: new Date(),
    email: `andi@gmail.com`,
    password: hashPassword(`12345`),
    mobilePhone: `081111111111`,
    address: `Indonesia`,
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const inputU2 = {
    name: `Budi`,
    photo:
      "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
    joinDate: new Date(),
    email: `budi@gmail.com`,
    password: hashPassword(`12345`),
    mobilePhone: `082222222222`,
    address: `Indonesia`,
    role: "sales",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let seedUsers1 = await testDb.collection("users").insertOne(inputU1);
  idUser1 = seedUsers1.insertedId;
  let seedUsers2 = await testDb.collection("users").insertOne(inputU2);
  idUser2 = seedUsers2.insertedId;

  //seeding orders
  const inputO1 = {
    storeId: new ObjectId(idStore1),
    userId: new ObjectId(idUser2),
    productOrder: [
      {
        productId: new ObjectId(idProduct1),
        qtySold: 20,
        price: 117000,
      },
      {
        productId: new ObjectId(idProduct2),
        qtySold: 4,
        price: 32000,
      },
    ],
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const inputO2 = {
    storeId: new ObjectId(idStore1),
    userId: new ObjectId(idUser2),
    productOrder: [
      {
        productId: new ObjectId(idProduct1),
        qtySold: 20,
        price: 117000,
      },
    ],
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let seedOrders1 = await testDb.collection("orders").insertOne(inputO1);
  idOrder1 = seedOrders1.insertedId;
  let seedOrders2 = await testDb.collection("orders").insertOne(inputO2);
  idOrder2 = seedOrders2.insertedId;
});

afterAll(async () => {
  try {
    // await client.connect();
    const testDb = client.db("fp-rmt-43-test");
    await testDb.collection("stores").deleteMany({});
    await testDb.collection("products").deleteMany({});
    await testDb.collection("users").deleteMany({});
    await testDb.collection("orders").deleteMany({});
  } finally {
    await client.close();
  }
});

describe.only("GET /stores", () => {
  test("Success should return list of stores include orders", async () => {
    const response = await request(app).get("/stores");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("photo", expect.any(String));
    expect(response.body[0]).toHaveProperty("joinDate", expect.any(String));
    expect(response.body[0]).toHaveProperty("orders", expect.any(Array));
    expect(response.body[0].orders).toBeInstanceOf(Array);
    expect(response.body[0].orders[0]).toHaveProperty(
      "storeId",
      expect.any(String)
    );
    expect(response.body[0].orders[0]).toHaveProperty(
      "userId",
      expect.any(String)
    );
    expect(response.body[0].orders[0]).toHaveProperty(
      "productOrder",
      expect.any(Array)
    );
    expect(response.body[0].orders[0]).toHaveProperty(
      "status",
      expect.any(String)
    );
    expect(response.body[0].orders[0]).toHaveProperty(
      "createdAt",
      expect.any(String)
    );
    expect(response.body[0].orders[0]).toHaveProperty(
      "updatedAt",
      expect.any(String)
    );
    expect(response.body[0].orders[0].productOrder).toBeInstanceOf(Array);
    expect(response.body[0].orders[0].productOrder[0]).toHaveProperty(
      "productId",
      expect.any(String)
    );
    expect(response.body[0].orders[0].productOrder[0]).toHaveProperty(
      "qtySold",
      expect.any(Number)
    );
    expect(response.body[0].orders[0].productOrder[0]).toHaveProperty(
      "price",
      expect.any(Number)
    );
  });
});
