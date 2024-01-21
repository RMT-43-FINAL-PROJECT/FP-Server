# END POINTS

## ORDERS

### GET /orders

Get all data from orders collection with order value

#### Request Header

```json
{
  "Authorization": "Admin Token"
}
```

#### Request Body

None

#### Response (200)

```json
[
  {
    "_id": "65a666b4ef33f639c273f75f",
    "status": "pending",
    "createdAt": "2024-01-16T11:21:24.667Z",
    "updatedAt": "2024-01-16T11:21:24.667Z",
    "store": {
      "_id": "65a6661db4fe8ae80cec2a19",
      "name": "Toko Plastik Morodadi"
    },
    "user": {
      "_id": "65a7a0387948c4bb3153a8b0",
      "name": "Cristiano Ronaldo"
    },
    "productOrder": [
      {
        "productId": "65a7ee0845ca2a04fba0a032",
        "qtySold": 9,
        "price": 32000,
        "name": "Citra",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "billPerItem": 288000
      }
    ],
    "totalBill": 288000
  },
  {
    "_id": "65ab5e24d0ccb45b1e2f3f85",
    "status": "confirmed",
    "createdAt": "2024-01-16T11:21:24.667Z",
    "updatedAt": "2024-01-16T11:21:24.667Z",
    "store": {
      "_id": "65a6661db4fe8ae80cec2a19",
      "name": "Toko Plastik Morodadi"
    },
    "user": {
      "_id": "65a7a0387948c4bb3153a8b0",
      "name": "Cristiano Ronaldo"
    },
    "productOrder": [
      {
        "productId": "65a7ee0845ca2a04fba0a033",
        "qtySold": 9,
        "price": 32000,
        "name": "Citra",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "billPerItem": 288000
      },
      {
        "productId": "65a7ee0845ca2a04fba0a032",
        "qtySold": 9,
        "price": 41000,
        "name": "Clear",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/9ae857a0c457f83d68373a7eba720928f89d7905-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "billPerItem": 369000
      }
    ],
    "totalBill": 657000
  },
  {
    "_id": "65ab5e8ed0ccb45b1e2f3f86",
    "status": "confirmed",
    "createdAt": "2024-01-16T11:21:24.667Z",
    "updatedAt": "2024-01-16T11:21:24.667Z",
    "store": {
      "_id": "65aa29a837de349042882c2f",
      "name": "Toko Sehat"
    },
    "user": {
      "_id": "65a7a0387948c4bb3153a8b0",
      "name": "Cristiano Ronaldo"
    },
    "productOrder": [
      {
        "productId": "65a7ee0845ca2a04fba0a035",
        "qtySold": 9,
        "price": 32000,
        "name": "Citra",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "billPerItem": 288000
      },
      {
        "productId": "65a7ee0845ca2a04fba0a032",
        "qtySold": 9,
        "price": 23000,
        "name": "Sunsilk",
        "image": "https://cdn.sanity.io/images/92ui5egz/production/6a452ea6283ed10c84efe822b24271d5f4f801df-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
        "category": "Beauty & Wellbeing",
        "billPerItem": 207000
      }
    ],
    "totalBill": 495000
  },
  ...,
]
```

#### Response (401- Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

#### Response (403- Forbidden)

```json
{
  "message": "Forbidden Access. Admin only"
}
```

### GET /orders/:id

Get detailed data from orders collection with order value

#### Request Header

```json
{
  "Authorization": "Admin Token || Author Token"
}
```

#### Request Body

None

#### Response (200)

```json
{
  "_id": "65ab5e24d0ccb45b1e2f3f85",
  "status": "confirmed",
  "createdAt": "2024-01-16T11:21:24.667Z",
  "updatedAt": "2024-01-16T11:21:24.667Z",
  "store": {
    "_id": "65a6661db4fe8ae80cec2a19",
    "name": "Toko Plastik Morodadi"
  },
  "user": {
    "_id": "65a7a0387948c4bb3153a8b0",
    "name": "Cristiano Ronaldo"
  },
  "productOrder": [
    {
      "productId": "65a7ee0845ca2a04fba0a033",
      "qtySold": 9,
      "price": 32000,
      "name": "Citra",
      "image": "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
      "category": "Beauty & Wellbeing",
      "billPerItem": 288000
    },
    {
      "productId": "65a7ee0845ca2a04fba0a032",
      "qtySold": 9,
      "price": 41000,
      "name": "Clear",
      "image": "https://cdn.sanity.io/images/92ui5egz/production/9ae857a0c457f83d68373a7eba720928f89d7905-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
      "category": "Beauty & Wellbeing",
      "billPerItem": 369000
    }
  ],
  "totalBill": 657000
}
```

#### Response (401- Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

#### Response (403- Forbidden)

```json
{
  "message": "Forbidden Access. Admin && related Sales only"
}
```

#### Response (404- Not Found)

```json
{
  "message": "No order found with this ID"
}
```

## GLOBAL ERROR

### Response (500 - Internal Server Error)

```json
{ "message": "Internal Server Error" }
```
