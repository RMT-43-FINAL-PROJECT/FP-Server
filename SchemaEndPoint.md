## 1.A GET List all Orders () // Untuk kebutuhan Tabel All Orders // Authorization Admin Only

```json
[
  {
    "_id": "ObjectId(`65a666b4ef33f639c273f75f`)",
    "storeId": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "userId": " ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "productOrder": [
      {
        "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
        "qtySold": 20,
        "price": 117000
      },
      {
        "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
        "qtySold": 20,
        "price": 117000
      }
    ],
    "status": "pending",
    "createdAt": "2024-01-16T11:21:24.667+00:00",
    "updatedAt": "2024-01-16T11:21:24.667+00:00",
    "storeName": "Toko Morodadi",
    "userName": "Andi Alfa"
  },
  {
    "_id": "ObjectId(`65a666b4ef33f639c273f75f`)",
    "storeId": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "userId": " ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "productOrder": [
      {
        "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
        "qtySold": 20,
        "price": 117000
      },
      {
        "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
        "qtySold": 20,
        "price": 117000
      }
    ],
    "status": "pending",
    "createdAt": "2024-01-16T11:21:24.667+00:00",
    "updatedAt": "2024-01-16T11:21:24.667+00:00",
    "storeName": "Toko Morodadi",
    "userName": "Andi Alfa"
  },
  ...,
]
```

### 1.B GET Orders By Id (id) // untuk kebutuhan Order Detail // Authorization Admin & Author Only

```json
{
  "_id": "ObjectId(`65a666b4ef33f639c273f75f`)",
  "storeId": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
  "userId": " ObjectId(`65a6661db4fe8ae80cec2a19`)",
  "productOrder": [
    {
      "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
      "qtySold": 20,
      "price": 117000
    },
    {
      "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
      "qtySold": 20,
      "price": 117000
    }
  ],
  "status": "pending",
  "createdAt": "2024-01-16T11:21:24.667+00:00",
  "updatedAt": "2024-01-16T11:21:24.667+00:00",
  "storeName": "Toko Morodadi",
  "userName": "Andi Alfa"
}
```

### 1.C POST Orders (body) // Auth Login

GET Simple Store List // untuk select input
GET All Available Product List // untuk select input

```json
const body = {
  "storeId": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
  "userId": "ObjectId(`65a6661db4fe8ae80cec2a19`)", //dpt dr headers client ya..
  "productOrder": [
    {
      "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
      "qtySold": 20,
      "price": 117000
    },
    {
      "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
      "qtySold": 20,
      "price": 117000
    }
  ],
  "status": "pending",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

return {message: `Create Orders With ID ${_id} Successful`}

### 1.D PUT Orders (body, id) // yang bisa diedit cuman product sm statusnya aja ya.. // Authorization Admin && Author Only

GET Simple Store List // untuk select input
GET All Available Product List // untuk select input

```json
const body = {
    "_id": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "productOrder": [
    {
      "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
      "qtySold": 20,
      "price": 117000
    },
    {
      "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
      "qtySold": 20,
      "price": 117000
    }
  ],
  "status": "pending",
}

```

return {message: `Update Orders With ID ${_id} Successful`}

### 1.E DELETE Orders (id) // Authorization Admin Only

```json
const body = {
  "_id": "ObjectId(`65a666b4ef33f639c273f75f`)"
}
```

return {message: `Delete Orders With ID ${_id} Successful`}

### 1.F GET Orders By User(userId) // For Sales Performance Admin && User With Same ID only

//SORT CREATED AT

```json
[
  {
    "_id": "ObjectId(`65a666b4ef33f639c273f75f`)",
    "storeId": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "userId": " ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "productOrder": [
      {
        "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
        "qtySold": 20,
        "price": 117000
      },
      {
        "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
        "qtySold": 20,
        "price": 117000
      }
    ],
    "status": "pending",
    "createdAt": "2024-01-16T11:21:24.667+00:00",
    "updatedAt": "2024-01-16T11:21:24.667+00:00",
    "storeName": "Toko Morodadi",
    "userName": "Andi Alfa"
  },
  {
    "_id": "ObjectId(`65a666b4ef33f639c273f75f`)",
    "storeId": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "userId": " ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "productOrder": [
      {
        "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
        "qtySold": 20,
        "price": 117000
      },
      {
        "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
        "qtySold": 20,
        "price": 117000
      }
    ],
    "status": "pending",
    "createdAt": "2024-01-16T11:21:24.667+00:00",
    "updatedAt": "2024-01-16T11:21:24.667+00:00",
    "storeName": "Toko Morodadi",
    "userName": "Andi Alfa"
  },
  ...,
]
```

### 1.G GET Orders By store(storeId) // For Sales Performance

//SORT CREATED AT

```json
[
  {
    "_id": "ObjectId(`65a666b4ef33f639c273f75f`)",
    "storeId": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "userId": " ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "productOrder": [
      {
        "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
        "qtySold": 20,
        "price": 117000
      },
      {
        "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
        "qtySold": 20,
        "price": 117000
      }
    ],
    "status": "pending",
    "createdAt": "2024-01-16T11:21:24.667+00:00",
    "updatedAt": "2024-01-16T11:21:24.667+00:00",
    "storeName": "Toko Morodadi",
    "userName": "Andi Alfa"
  },
  {
    "_id": "ObjectId(`65a666b4ef33f639c273f75f`)",
    "storeId": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "userId": " ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "productOrder": [
      {
        "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
        "qtySold": 20,
        "price": 117000
      },
      {
        "productId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
        "qtySold": 20,
        "price": 117000
      }
    ],
    "status": "pending",
    "createdAt": "2024-01-16T11:21:24.667+00:00",
    "updatedAt": "2024-01-16T11:21:24.667+00:00",
    "storeName": "Toko Morodadi",
    "userName": "Andi Alfa"
  },
  ...,
]
```

## 2.A GET List all Products () // untuk Tabel Products

//COBA CARI CARA UNTUK BISA INCLUDE PENJUALAN

```json
[
  {
    "_id": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "name": "Indomie Goreng Rendang",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY6K14kytL1CImvzh2gGyZnoXz4ZPFnuIzQg&usqp=CAU",
    "category": "Makanan",
    "stock": 999,
    "price": 117000,
    "discQty": 30,
    "discPercent": 1,
    "isAvailable": true,
    "createdAt": "2024-01-16T11:21:24.667+00:00",
    "updatedAt": "2024-01-16T11:21:24.667+00:00"
  },
  {
    "_id": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "name": "Indomie Goreng Rendang",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY6K14kytL1CImvzh2gGyZnoXz4ZPFnuIzQg&usqp=CAU",
    "category": "Makanan",
    "stock": 999,
    "price": 117000,
    "discQty": 30,
    "discPercent": 1,
    "isAvailable": true,
    "createdAt": "2024-01-16T11:21:24.667+00:00",
    "updatedAt": "2024-01-16T11:21:24.667+00:00"
  },
  ...,
]
```

### 2.B GET Products by ID (id) // untuk Detail Products

```json
  {
    "_id": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "name": "Indomie Goreng Rendang",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY6K14kytL1CImvzh2gGyZnoXz4ZPFnuIzQg&usqp=CAU",
    "category": "Makanan",
    "stock": 999,
    "price": 117000,
    "discQty": 30,
    "discPercent": 1,
    "isAvailable": true,
    "createdAt": "2024-01-16T11:21:24.667+00:00",
    "updatedAt": "2024-01-16T11:21:24.667+00:00"
  },
```

### 2.C POST Products (body) // Authorization Admin Only

```json
const body = {
    "name": "Indomie Goreng Rendang",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY6K14kytL1CImvzh2gGyZnoXz4ZPFnuIzQg&usqp=CAU", //pakai multer simpan di cloudinary
    "category": "Makanan",
    "stock": 999,
    "price": 117000,
    "discQty": 30,
    "discPercent": 1,
    "isAvailable": true,
    "createdAt": "2024-01-16T11:21:24.667+00:00",
    "updatedAt": "2024-01-16T11:21:24.667+00:00"
  },
```

return {message: `Create Product With ID ${_id} Successfull`}

### 2.D PUT Products(body, id) // Authorization Admin Only

```json
const body = {
    "_id":  "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "name": "Indomie Goreng Rendang",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY6K14kytL1CImvzh2gGyZnoXz4ZPFnuIzQg&usqp=CAU", //pakai multer simpan di cloudinary
    "category": "Makanan",
    "stock": 999,
    "price": 117000,
    "discQty": 30,
    "discPercent": 1,
    "isAvailable": true,
  },
```

return {message: `Update Product With ID ${_id} Successfull`}

### 2.E DELETE Products( id) // Authorization Admin Only

```json
const body = {
  "_id": "ObjectId(`65a666b4ef33f639c273f75f`)"
}
```

return {message: `Delete Product With ID ${_id} Successfull`}

### 2.F GET All Available Product List () // untuk select input

//JGN LUPA PAKE MATCH: "isAvailable": true

```json
[
  {
    "_id": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "name": "Indomie Goreng Rendang",
    "stock": 999,
    "price": 117000,
    "discQty": 30,
    "discPercent": 1,
    "isAvailable": true
  },
  {
    "_id": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "name": "Indomie Goreng Rendang",
    "stock": 999,
    "price": 117000,
    "discQty": 30,
    "discPercent": 1,
    "isAvailable": true
  },
  ...,
]

```

## 3.A GET List all Schedules() // Authorization Admin Only

```json
[
  {
    "_id": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "storeId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "userId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "location": {
      "type": "Point",
      "coordinates": [112.63070356923028, -7.986860420618447]
    },
    "time": "2024-01-16T11:21:24.667+00:00",
    "isCompleted": false,
    "storeName": "Toko Morodadi",
    "userName": "Andi Alfa",
    "createdAt": "2024-01-16T11:21:24.667+00:00",
    "updatedAt": "2024-01-16T11:21:24.667+00:00"
  },
  {
    "_id": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "storeId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "userId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "location": {
      "type": "Point",
      "coordinates": [112.63070356923028, -7.986860420618447]
    },
    "time": "2024-01-16T11:21:24.667+00:00",
    "isCompleted": false,
    "storeName": "Toko Morodadi",
    "userName": "Andi Alfa",
    "createdAt": "2024-01-16T11:21:24.667+00:00",
    "updatedAt": "2024-01-16T11:21:24.667+00:00"
  },
  ...,
]
```

### 3.B GET Schedules detail by Id(id) // Authorization Admin Only $ Sales with same ID Only

```json
{
  "_id": "ObjectId(`65a665f572a4ab2c12b8d151`)",
  "storeId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
  "userId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
  "location": {
    "type": "Point",
    "coordinates": [112.63070356923028, -7.986860420618447]
  },
  "time": "2024-01-16T11:21:24.667+00:00",
  "isCompleted": false,
  "storeName": "Toko Morodadi",
  "userName": "Andi Alfa",
  "createdAt": "2024-01-16T11:21:24.667+00:00",
  "updatedAt": "2024-01-16T11:21:24.667+00:00"
}
```

## 3.C POST Schedules(body) // Authorization Admin Only

GET Simple Store List // untuk select input
GET Simple User List // untuk select input

```json
const body =  {
    "storeId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "userId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "location": {
      "type": "Point",
      "coordinates": [112.63070356923028, -7.986860420618447]
    },
    "time": "2024-01-16T11:21:24.667+00:00",
    "isCompleted": false,
    "createdAt": "2024-01-16T11:21:24.667+00:00",
    "updatedAt": "2024-01-16T11:21:24.667+00:00"
  },

```

return {message: `Create Schedule With ID ${_id} Successfull`}

## 3.D PUT Schedules(body, id) // Authorization Admin Only

GET Simple Store List // untuk select input
GET Simple User List // untuk select input

```json
const body =  {
    "_id" : "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "storeId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "userId": "ObjectId(`65a665f572a4ab2c12b8d151`)",
    "location": {
      "type": "Point",
      "coordinates": [112.63070356923028, -7.986860420618447]
    },
    "time": "2024-01-16T11:21:24.667+00:00",
    "isCompleted": false,
  },

```

return {message: `Update Schedule With ID ${_id} Successfull`}

## 3.E DELETE Schedules(id) // Authorization Admin Only

```json
const body = {
  "_id": "ObjectId(`65a666b4ef33f639c273f75f`)"
}
```

return {message: `DELETE Schedule With ID ${_id} Successfull`}

## 4.A GET List all Stores ()

```json
[
  {
    "_id": "ObjectId(`65a666b4ef33f639c273f75f`)",
    "name": "Toko Plastik Morodadi",
    "photo": "https://lh3.googleusercontent.com/p/AF1QipOE83L2OliXcZV7nczQvFhooFJc7q…",
    "joinDate": "2024-01-16T11:18:53.205+00:00",
    //include
    "orders": [
        {
            "productOrder": [
                {
                    "productId": "ObjectId(`65a666b4ef33f639c273f75f`)",
                    "qtySold": 20,
                    "price": 117000
                },
                {
                    "productId": "ObjectId(`65a666b4ef33f639c273f75f`)",
                    "qtySold": 20,
                    "price": 117000
                },

            ]
        }
    ]
  },
  {
    "_id": "ObjectId(`65a666b4ef33f639c273f75f`)",
    "name": "Toko Plastik Morodadi",
    "photo": "https://lh3.googleusercontent.com/p/AF1QipOE83L2OliXcZV7nczQvFhooFJc7q…",
    "joinDate": "2024-01-16T11:18:53.205+00:00",
    //include
    "orders": [
        {
            "productOrder": [
                {
                    "productId": "ObjectId(`65a666b4ef33f639c273f75f`)",
                    "qtySold": 20,
                    "price": 117000
                },
                {
                    "productId": "ObjectId(`65a666b4ef33f639c273f75f`)",
                    "qtySold": 20,
                    "price": 117000
                },
                ]
        }
    ]
  },
  ...,

]
```

## 4.B GET Stores by ID (id)

```json
{
  "_id": "ObjectId(`65a666b4ef33f639c273f75f`)",
  "name": "Toko Plastik Morodadi",
  "location": {
    "type": "Point",
    "coordinates": [112.63070356923028, -7.986860420618447]
  },
  "photo": "https://lh3.googleusercontent.com/p/AF1QipOE83L2OliXcZV7nczQvFhooFJc7q…",
  "address": "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
  "joinDate": "2024-01-16T11:18:53.205+00:00",
  "ownerName": "Bambang",
  "mobilePhone": "082222222222",
  "status ": "confirmed",
  "createdAt": "2024-01-16T11:21:24.667+00:00",
  "updatedAt": "2024-01-16T11:21:24.667+00:00"
}
```

## 4.C POST Stores (body)

```json
const body = {
  "name": "Toko Plastik Morodadi",
  "location": {
    "type": "Point",
    "coordinates": [112.63070356923028, -7.986860420618447]
  },
  "photo": "https://lh3.googleusercontent.com/p/AF1QipOE83L2OliXcZV7nczQvFhooFJc7q…", //pakai multer simpan di cloudinary
  "address": "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
  "joinDate": "2024-01-16T11:18:53.205+00:00", // formatnya DATE ya..
  "ownerName": "Bambang",
  "mobilePhone": "082222222222",
  "status ": "pending",
  "createdAt": "2024-01-16T11:21:24.667+00:00",
  "updatedAt": "2024-01-16T11:21:24.667+00:00"
}
```

return {message: `Create Store With ID ${_id} Successfull`}

## 4.D PUT Stores (body, id) // Authorization Admin Only

```json
const body = {
    "_id": "ObjectId(`65a666b4ef33f639c273f75f`)",
  "name": "Toko Plastik Morodadi",
  "location": {
    "type": "Point",
    "coordinates": [112.63070356923028, -7.986860420618447]
  },
  "photo": "https://lh3.googleusercontent.com/p/AF1QipOE83L2OliXcZV7nczQvFhooFJc7q…", //pakai multer simpan di cloudinary
  "address": "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
  "joinDate": "2024-01-16T11:18:53.205+00:00", // formatnya DATE ya..
  "ownerName": "Bambang",
  "mobilePhone": "082222222222",
  "status ": "pending",
}
```

return {message: `Update Store With ID ${_id} Successfull`}

## 4.E DELETE Stores ( id) // Authorization Admin Only

```json
const body = {
    "_id": "ObjectId(`65a666b4ef33f639c273f75f`)",
}
```

return {message: `Delete Store With ID ${_id} Successfull`}

### 4.F GET Simple Store List ()//untuk kebutuhan select input

```json
[
  {
    "_id": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "name": "Toko Morodadi Plastik",
    "location": {
      "type": "Point",
      "coordinates": [112.63070356923028, -7.986860420618447]
    },
  },
  {
    "_id": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "name": "Toko Morodadi Plastik",
    "location": {
      "type": "Point",
      "coordinates": [112.63070356923028, -7.986860420618447]
    },
  },
  ...,
]
```

## 5.A GET List all Users () // Authorization Admin Only

//PAKAI WHERE ROLE + "user"

```json
[
  {
    "_id": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTftxleDHI-if-j8cesklsJRqCzjpWOnbDZEw&usqp=CAU",
    "name": "Andi Alpha",
    "joinDate": "2024-01-16T11:17:44.516+00:00",
    //include
    "orders": [
      {
        "productOrder": [
          {
            "productId": "ObjectId(`65a666b4ef33f639c273f75f`)",
            "qtySold": 20,
            "price": 117000
          },
          {
            "productId": "ObjectId(`65a666b4ef33f639c273f75f`)",
            "qtySold": 20,
            "price": 117000
          }
        ]
      }
    ]
  },
  {
    "_id": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTftxleDHI-if-j8cesklsJRqCzjpWOnbDZEw&usqp=CAU",
    "name": "Andi Alpha",
    "joinDate": "2024-01-16T11:17:44.516+00:00",
    //include
    "orders": [
      {
        "productOrder": [
          {
            "productId": "ObjectId(`65a666b4ef33f639c273f75f`)",
            "qtySold": 20,
            "price": 117000
          },
          {
            "productId": "ObjectId(`65a666b4ef33f639c273f75f`)",
            "qtySold": 20,
            "price": 117000
          }
        ]
      }
    ]
  }
]
```

## 5.B GET Users by ID(id) // Authorization Admin & Author Only

```json
{
  "_id": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
  "address": "JL Bandung 17a, Malang, Jawa Timur",
  "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTftxleDHI-if-j8cesklsJRqCzjpWOnbDZEw&usqp=CAU",
  "name": "Andi Alpha",
  "joinDate": "2024-01-16T11:17:44.516+00:00",
  "email": "andi@mail.com",
  "password": "Ax81y9481984xny0928y9823y04x81y",
  "mobilePhone": "082111111111",
  "role": "user",
  "createdAt": "2024-01-16T11:21:24.667+00:00",
  "updatedAt": "2024-01-16T11:21:24.667+00:00"
}
```

## 5.C POST Users(body) // Authorization Admin Only

```json
const body = {
  "address": "JL Bandung 17a, Malang, Jawa Timur",
  "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTftxleDHI-if-j8cesklsJRqCzjpWOnbDZEw&usqp=CAU", //pakai multer simpan di cloudinary
  "name": "Andi Alpha",
  "joinDate": "2024-01-16T11:17:44.516+00:00",
  "email": "andi@mail.com",
  "mobilePhone": "082111111111",
  "role": "user",
  "createdAt": "2024-01-16T11:21:24.667+00:00",
  "updatedAt": "2024-01-16T11:21:24.667+00:00"
}
```

return {message: `Create User With ID ${_id} Successfull`}

## 5.D PUT Users by ID(body, id) // Authorization Admin & Author Only

```json
const body = {
    "_id": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
  "address": "JL Bandung 17a, Malang, Jawa Timur",
  "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTftxleDHI-if-j8cesklsJRqCzjpWOnbDZEw&usqp=CAU", //pakai multer simpan di cloudinary
  "name": "Andi Alpha",
  "joinDate": "2024-01-16T11:17:44.516+00:00",
  "email": "andi@mail.com",
  "mobilePhone": "082111111111",
  "role": "user",
  "createdAt": "2024-01-16T11:21:24.667+00:00",
  "updatedAt": "2024-01-16T11:21:24.667+00:00"
}
```

return {message: `Update User With ID ${_id} Successfull`}

## 5.E DELETE Users ( id) // Authorization Admin Only

```json
const body = {
    "_id": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
  "address": "JL Bandung 17a, Malang, Jawa Timur",
  "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTftxleDHI-if-j8cesklsJRqCzjpWOnbDZEw&usqp=CAU", //pakai multer simpan di cloudinary
  "name": "Andi Alpha",
  "joinDate": "2024-01-16T11:17:44.516+00:00",
  "email": "andi@mail.com",
  "mobilePhone": "082111111111",
  "role": "user",
  "createdAt": "2024-01-16T11:21:24.667+00:00",
  "updatedAt": "2024-01-16T11:21:24.667+00:00"
}
```

return {message: `Delete User With ID ${_id} Successfull`}

### 5.F GET Simple User List // untuk select input

```json
[
  {
    "_id": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "name": "Andi Alfa"
  },
  {
    "_id": "ObjectId(`65a6661db4fe8ae80cec2a19`)",
    "name": "Andi Alfa"
  },
  ...,
]
```
