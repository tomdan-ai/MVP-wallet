### API Documentation

#### Base URL
The base URL for all API endpoints is your local server `https://http://127.0.0.1:3000`.

#### Authentication
Currently, there is no authentication required for accessing the APIs in this application.

### Endpoints

#### 1. User Registration

- **URL**: `/api/register`
- **Method**: `POST`
- **Description**: Registers a new user in the system.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
  - `name` (string, required): The name of the user.
  - `email` (string, required): The email address of the user.
  - `password` (string, required): The password for the user's account.
- **Success Response**:
  - **Code**: 201 CREATED
  - **Content**:
    ```json
    {
      "id": "string",
      "name": "string",
      "balance": 0,
      "karma": 0
    }
    ```
  - `id` (string): The unique identifier of the registered user.
  - `name` (string): The name of the registered user.
  - `balance` (number): The initial balance in the user's account (default: 0).
  - `karma` (number): The initial karma points of the user (default: 0).
- **Error Responses**:
  - **Code**: 400 BAD REQUEST
  - **Content**: `{ "error": "Invalid request body" }`
  - **Code**: 409 CONFLICT
  - **Content**: `{ "error": "User already exists" }`

#### 2. User Login

- **URL**: `/api/login`
- **Method**: `POST`
- **Description**: Logs in an existing user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
  - `email` (string, required): The email address of the user.
  - `password` (string, required): The password for the user's account.
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "token": "string"
    }
    ```
  - `token` (string): A JWT token for accessing authenticated endpoints.
- **Error Responses**:
  - **Code**: 401 UNAUTHORIZED
  - **Content**: `{ "error": "Invalid credentials" }`

#### 3. Account Funding

- **URL**: `/api/fund`
- **Method**: `POST`
- **Description**: Allows a user to fund their account.
- **Request Body**:
  ```json
  {
    "amount": 100
  }
  ```
  - `amount` (number, required): The amount to be added to the user's account.
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "message": "Funds added successfully",
      "new_balance": 1000
    }
    ```
  - `message` (string): A success message indicating the funds were added.
  - `new_balance` (number): The updated balance after adding funds.
- **Error Responses**:
  - **Code**: 400 BAD REQUEST
  - **Content**: `{ "error": "Invalid amount" }`

#### 4. Transfer Funds

- **URL**: `/api/transfer`
- **Method**: `POST`
- **Description**: Transfers funds from one user's account to another.
- **Request Body**:
  ```json
  {
    "recipient_email": "string",
    "amount": 100
  }
  ```
  - `recipient_email` (string, required): The email address of the recipient user.
  - `amount` (number, required): The amount to be transferred.
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "message": "Funds transferred successfully",
      "sender_balance": 900,
      "recipient_balance": 200
    }
    ```
  - `message` (string): A success message indicating the funds were transferred.
  - `sender_balance` (number): The updated balance of the sender after the transfer.
  - `recipient_balance` (number): The updated balance of the recipient after receiving the transfer.
- **Error Responses**:
  - **Code**: 400 BAD REQUEST
  - **Content**: `{ "error": "Invalid recipient email or amount" }`

#### 5. Withdraw Funds

- **URL**: `/api/withdraw`
- **Method**: `POST`
- **Description**: Allows a user to withdraw funds from their account.
- **Request Body**:
  ```json
  {
    "amount": 100
  }
  ```
  - `amount` (number, required): The amount to be withdrawn from the user's account.
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "message": "Funds withdrawn successfully",
      "new_balance": 800
    }
    ```
  - `message` (string): A success message indicating the funds were withdrawn.
  - `new_balance` (number): The updated balance after withdrawing funds.
- **Error Responses**:
  - **Code**: 400 BAD REQUEST
  - **Content**: `{ "error": "Insufficient balance" }`

### Summary

This API documentation provides an overview of the endpoints available in the MVP Wallet Application, along with their expected inputs, outputs, and error responses. Adjust the specifics (URLs, request/response bodies) to match your actual implementation. This structured approach helps developers and users understand how to interact with the wallet service  APIs effectively.