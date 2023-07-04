# REST API

Branded things app is an app to manage the asset. This app has :

- RESTful endpoint for asset's CRUD operation

&nbsp;

## RESTful endpoints

### POST /customers/register
> Create new customers

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>"
  "password": "<password to get insert into>"
  "phoneNumber": "<phoneNumber to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": "<id customer>"
  "email": "<email customer>"
}
```

### POST /customers/login
> Login customers

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
  
}
```

_Response (200)_
```
{
  "access_token": "<access token>"
}
```

### GET /customers/products

> Get all products 
_Request Header_
```
not needed
```

_Request Query_
```
{
  "page": "< your current page>"
  "categoryId": "<selected category>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "name": "Shrimp",
    "requested": 3000,
    "destination": "Japan",
    "imgUrl": "https://indonesiaseafood.id/assets/images/produk/crustacea_indonesiaseafood_20211015103245.png",
    "price": 10,
    "customerId": 1,
    "categoryId": 1
  },
]
```

### GET /customers/categories

> Get all categories 
_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "name": "CONSUMPTION MATERIAL",
    "createdAt": "2023-03-08T12:54:38.087Z",
    "updatedAt": "2023-03-08T12:54:38.087Z"
  },
]
```

### GET /customers/currency

> 3rd Party API to convert currency from USD to IDR 
_Request Header_
```
{
  "amount": "<amount in USD>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
 {
  "success": true,
  "query": {
    "from": <currency>,
    "to": <currency>,
    "amount": <inputted amount from headers>
  },
  "info": {
    "timestamp": <timestamp>,
    "rate": 15449.05
  },
  "date": "2023-03-08",
  "result": <converter result>
}
]
```

### GET /customers/details

> Get current customer details 
_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": <current customer id>,
  "email": <current customer email>,
  "subscribe": <current customer subscription status>
}
```

### PATCH /customers/subscription

> Change current customer subscription status
_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
 "message": "Customer is now a subscriber"
}
```

### POST /customers/generate-midtrans-token

> Generate midtrans token 
_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "token": <token access for client side>,
  "redirect_url": <direct link payment>
}
```

### GET /customers/products/:id

> Get the product detail 

_Request Params_
```
{
  "id": "<product id>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": 1,
  "name": "Shrimp",
  "requested": 3000,
  "destination": "Japan",
  "imgUrl": "https://indonesiaseafood.id/assets/images/produk/crustacea_indonesiaseafood_20211015103245.png",
  "price": 10,
  "customerId": 1,
  "categoryId": 1,
  "createdAt": "2023-03-08T12:54:38.087Z",
  "updatedAt": "2023-03-08T12:54:38.087Z"
}
```

### GET /exports/

> Get the export detail for current customer

_Request Header_
```
{
  "access_token": "<access_token>"
}
```
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "customerId": 1,
    "productId": 1,
    "Product": {
      "id": 1,
      "name": "Shrimp",
      "requested": 3000,
      "destination": "Japan",
      "imgUrl": "https://indonesiaseafood.id/assets/images/produk/crustacea_indonesiaseafood_20211015103245.png",
      "price": 10,
      "customerId": 1,
      "categoryId": 1
    }
  }
]
```

### POST /exports/:productId

> Post product to export list 
_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Params_
```
{
  "productId": "<product id>"
}
```

_Request Body_
```
not needed
```

_Response (201) Created_
```
{
  "message": `product has been added to your export list`>
}
```

## GLOBAL ERROR

_Response (400)_

```
[
 {
  "message": "Email is required"
    OR
  "message": "Password is required"
    OR
  "message": "Email must be unique"
    OR
  "message": "Invalid email format"
    OR
  "message": "phoneNumber is required"
    OR
  "message": "You already subscribed"
}
]
```

_Response (401)_

```
[
 {
  "message": "Invalid Token"
  OR
  "message": "Invalid email/password"
}
]
```

_Response (404)_

```
[
 {
  "message": "Product not found"
}
]
```
