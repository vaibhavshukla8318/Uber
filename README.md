# /users/register Endpoint Documentation

## Endpoint Description
The `/users/register` endpoint is used to register a new user in the system. It accepts user details, validates the input, hashes the password, and creates a new user in the database. Upon successful registration, the endpoint responds with a JSON object containing a token and user details.

## Endpoint
- **URL**: `/users/register`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`

## Request Body
The request body must be a JSON object with the following fields:

### Required Fields
- `fullname.firstname`: A string, minimum of 3 characters (e.g., "John").
- `fullname.lastname`: A string, minimum of 3 characters (e.g., "Doe").
- `email`: A valid email address (e.g., "example@example.com").
- `password`: A string, minimum of 8 characters.

### Example Request Body
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

## Response
The response is a JSON object with the following fields:

### Success Response (201 Created)
- **Status Code**: `201`
- **Body**:
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

# /users/login Endpoint Documentation

## Endpoint Description
The `/users/login` endpoint is used to authenticate a user. It accepts the user's email and password, verifies the credentials, and returns a JSON object containing a token and user details if authentication is successful.

## Endpoint
- **URL**: `/users/login`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`

## Request Body
The request body must be a JSON object with the following fields:

### Required Fields
- `email`: A valid email address (e.g., "example@example.com").
- `password`: A string, minimum of 8 characters.

### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

## Response
The response is a JSON object with the following fields:

### Success Response (200 OK)
- **Status Code**: `200`
- **Body**:
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

### Error Responses
#### 400 Bad Request
Returned if the request body fails validation.
- **Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```

#### 401 Unauthorized
Returned if the email or password is incorrect.
- **Body**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

#### 500 Internal Server Error
Returned if an unexpected error occurs during processing.
- **Body**:
  ```json
  {
    "message": "Internal server error"
  }
  ```

## Validation Rules
- `email`: Must be a valid email address.
- `password`: Minimum 8 characters.

## Notes
- Passwords are verified using bcrypt.
- The generated token can be used for authenticated requests in subsequent API calls.
