# END POINTS

## STORE

### GET /stores

Get all data from stores collection and include orders from the store

#### Request Header

None

#### Request Body

None

#### Response (200)

```json
[
  {
    "_id": "65a6661db4fe8ae80cec2a19",
    "name": "Toko Plastik Morodadi",
    "photo": "https://lh3.googleusercontent.com/p/AF1QipOE83L2OliXcZV7nczQvFhooFJc7qxtLGb7kYCT=s1360-w1360-h1020",
    "joinDate": "2024-01-16T11:18:53.205Z",
    "orders": [
      {
        "_id": "65a666b4ef33f639c273f75f",
        "storeId": "65a6661db4fe8ae80cec2a19",
        "userId": "65a665d80d9bf3239adde346",
        "productOrder": [
          {
            "productId": "65a665f572a4ab2c12b8d151",
            "qtySold": 20,
            "price": 117000
          }
        ],
        "status": "pending",
        "createdAt": "2024-01-16T11:21:24.667Z",
        "updatedAt": "2024-01-16T11:21:24.667Z"
      }
    ]
  },{
    "_id": "65a6661db4fe8ae80cec2a19",
    "name": "Toko Plastik Morodadi",
    "photo": "https://lh3.googleusercontent.com/p/AF1QipOE83L2OliXcZV7nczQvFhooFJc7qxtLGb7kYCT=s1360-w1360-h1020",
    "joinDate": "2024-01-16T11:18:53.205Z",
    "orders": [
      {
        "_id": "65a666b4ef33f639c273f75f",
        "storeId": "65a6661db4fe8ae80cec2a19",
        "userId": "65a665d80d9bf3239adde346",
        "productOrder": [
          {
            "productId": "65a665f572a4ab2c12b8d151",
            "qtySold": 20,
            "price": 117000
          }
        ],
        "status": "pending",
        "createdAt": "2024-01-16T11:21:24.667Z",
        "updatedAt": "2024-01-16T11:21:24.667Z"
      },
      {
        "_id": "65a666b4ef33f639c273f75f",
        "storeId": "65a6661db4fe8ae80cec2a19",
        "userId": "65a665d80d9bf3239adde346",
        "productOrder": [
          {
            "productId": "65a665f572a4ab2c12b8d151",
            "qtySold": 20,
            "price": 117000
          }
        ],
        "status": "pending",
        "createdAt": "2024-01-16T11:21:24.667Z",
        "updatedAt": "2024-01-16T11:21:24.667Z"
      },
      ...
    ]
  },
  ...,
]
```

## GLOBAL ERROR

### Response (500 - Internal Server Error)

```json
{ "message": "Internal Server Error" }
```
