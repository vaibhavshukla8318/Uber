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
