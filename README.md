# User API Documentation

## Endpoints

### /users/register

#### Description
The `/users/register` endpoint is used to register a new user in the system. It validates the input, hashes the password, and creates a new user in the database. Upon successful registration, it returns a JSON object containing a token and user details.

#### URL
- **Method**: `POST`
- **Endpoint**: `/users/register`

#### Headers
- `Content-Type: application/json`

#### Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

#### Response
**201 Created**
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "<USER_ID>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

### /users/login

#### Description
The `/users/login` endpoint is used to authenticate a user by verifying the provided email and password. If successful, it returns a JSON object containing a token and user details.

#### URL
- **Method**: `POST`
- **Endpoint**: `/users/login`

#### Headers
- `Content-Type: application/json`

#### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

#### Response
**200 OK**
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "<USER_ID>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

**401 Unauthorized**
```json
{
  "message": "Invalid email or password"
}
```

---

### /users/profile

#### Description
The `/users/profile` endpoint retrieves the authenticated user's profile information.

#### URL
- **Method**: `GET`
- **Endpoint**: `/users/profile`

#### Headers
- `Authorization: Bearer <JWT_TOKEN>`

#### Response
**200 OK**
```json
{
  "_id": "<USER_ID>",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

**401 Unauthorized**
```json
{
  "message": "Access denied. Unauthorized."
}
```

---

### /users/logout

#### Description
The `/users/logout` endpoint logs out the authenticated user by clearing their token and invalidating it in the database.

#### URL
- **Method**: `GET`
- **Endpoint**: `/users/logout`

#### Headers
- `Authorization: Bearer <JWT_TOKEN>`

#### Response
**200 OK**
```json
{
  "message": "Logged out successfully"
}
```

---

### /drivers/register

#### Description
The `/drivers/register` endpoint is used to register a new driver in the system. It validates the input, hashes the password, and creates a new driver in the database. Upon successful registration, it returns a JSON object containing a token and driver details.

#### URL
- **Method**: `POST`
- **Endpoint**: `/drivers/register`

#### Headers
- `Content-Type: application/json`

#### Request Body
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "SecurePass123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Response
**201 Created**
```json
{
  "token": "<JWT_TOKEN>",
  "driver": {
    "_id": "<DRIVER_ID>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**400 Bad Request**
```json
{
  "message": "Driver already exists with this email"
}
```
