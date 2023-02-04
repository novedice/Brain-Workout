# RS Clone - Brain Workout
Api for Rolling Scopes School task "RS Clone".
***
> ## Invalid token
> *If token is no longer valid api always return this error* <br />
>  **Code:** 403 FORBIDDEN <br />
>   **Content:** 
>   ```json
>      {
>       "message": "Token is no longer valid!"
>      }
>   ```
**User registration**
----
Create user and return authorization token

<details>

* **URL**

    /api/users/registration

* **Method:**

    `POST`

* **Headers:**

    None

*  **URL Params**

    None

* **Query Params**
    
    None

* **Data Params**

    ```typescript
      {
        email: string,
        password: string
      }
    ```

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
      {
        "token": "fadsf5a437txd764ax7634dxa7b3d4x6"
      }
    ```
    **Headers:**
      
      None
 
* **Error Response:**

    * **Code:** 400 BAD REQUESTS <br />
    **Content:** 
    ```json
      {
        "message": "User with this email already exists!"
      }
    ```
  OR
    * **Code:** 400 BAD REQUESTS <br />
    **Content:** 
    ```json
      {
        "message": "Invalid email or password!"
      }
    ```

* **Notes:**

    None

</details>

**User authorization**
----
Return authorization token

<details>

* **URL**

    /api/users/login

* **Method:**

    `POST`

* **Headers:**

    None

*  **URL Params**

    None

* **Query Params**
    
    None

* **Data Params**

    ```typescript
      {
        email: string,
        password: string
      }
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      {
        "token": "fadsf5a437txd764ax7634dxa7b3d4x6"
      }
    ```
    **Headers:**
      
      None
 
* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {
        "message": "User with this email not found!"
      }
    ```
  OR
    * **Code:** 400 BAD REQUESTS <br />
    **Content:** 
    ```json
      {
        "message": "Invalid email or password!"
      }
    ```
  OR
    * **Code:** 400 BAD REQUESTS <br />
    **Content:** 
    ```json
      {
        "message": "Wrong password!"
      }
    ```

* **Notes:**

    None

</details>

**Generate new authorization token**
----
Return new authorization token for the current user

<details>

* **URL**

    /api/users/auth

* **Method:**

    `GET`
  
* **Cookies:**
  
  ```typescript
    auth: "fadsf5a437txd764ax7634dxa7b3d4x6"
  ```
  
* **Headers:**

    None

*  **URL Params**

    None

* **Query Params**
    
    None

* **Data Params**

    ```typescript
      {
        email: string,
        password: string
      }
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      {
        "token": "fadsf5a437txd764ax7634dxa7b3d4x6"
      }
    ```
    **Headers:**
      
      None
 
* **Error Response:**

    * **Code:** 400 BAD REQUESTS <br />
    **Content:** 
    ```json
      {
        "message": "Invalid or missing token"
      }
    ```
  OR
    * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {
        "message": "User not found!"
      }
    ```

* **Notes:**

    None

</details>

**Delete user**
----
Delete the current user

<details>

* **URL**

    /api/users/users

* **Method:**

    `DELETE`
  
* **Cookies:**
  
  ```typescript
    auth: "fadsf5a437txd764ax7634dxa7b3d4x6"
  ```
  
* **Headers:**

    None

*  **URL Params**

    None

* **Query Params**
    
    None

* **Data Params**
  
  ```typescript
    {
      password: string,
    }
  ```
  Example:
  ```json
    {  
      "password": "123qwe",
    }
  ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      {  
        "message": "User deleted successfully!"
      }
    ```
    **Headers:**
      
      None
 
* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {
        "message": "User not found!"
      }
    ```
  OR
    * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
      {
        "message": "Wrong password!"
      }
    ```

* **Notes:**

    None

</details>

**Create preferred category**
----
Create new preferred category for the current user

<details>

* **URL**

    /api/users/categories

* **Method:**

    `POST`
  
* **Cookies:**
  
  ```typescript
    auth: "fadsf5a437txd764ax7634dxa7b3d4x6"
  ```
  
* **Headers:**

    None

*  **URL Params**

    None

* **Query Params**
    
    None

* **Data Params**

    ```typescript
      {
        category: string
      }
    ```
  Example:
    
    ```json
      {
        "category": "REACTION"
      }  
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      {
        "id": 1,
        "category": "REACTION"
      }
    ```
    **Headers:**
      
      None
 
* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {
        "message": "User not found!"
      }
    ```
  OR
    * **Code:** 400 BAD REQUESTS <br />
    **Content:** 
    ```json
      {
        "message": "Invalid category"
      }
    ```

* **Notes:**

    None

</details>

**Get preferred categories**
----
Return preferred categories for the current user

<details>

* **URL**

    /api/users/categories

* **Method:**

    `GET`
  
* **Cookies:**
  
  ```typescript
    auth: "fadsf5a437txd764ax7634dxa7b3d4x6"
  ```
  
* **Headers:**

    None

*  **URL Params**

    None

* **Query Params**
    
    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      [
        {
          "id": 1,
          "category": "MEMORY"
        },
        {
          "id": 2,
          "category": "REACTION"
        }
      ]
    ```
    **Headers:**
      
      None
 
* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {
        "message": "User not found!"
      }
    ```

* **Notes:**

    None

</details>

**Delete preferred category**
----
Delete preffered category for the current user

<details>

* **URL**

    /api/users/categories/:id

* **Method:**

    `DELETE`
  
* **Cookies:**
  
  ```typescript
    auth: "fadsf5a437txd764ax7634dxa7b3d4x6"
  ```
  
* **Headers:**

    None

*  **URL Params**

    Required:
    
    `id=[integer]`

* **Query Params**
    
    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      {
        "message": "Category deleted successfully!"
      }
    ```
    **Headers:**
      
      None
 
* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {
        "message": "Category not found!"
      }
    ```
  OR
    * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
      {
        "message": "This category belongs to another user!!"
      }
    ```

* **Notes:**

    None

</details>

**Create result**
----
Create result for the current user 

<details>

* **URL**

    /api/users/results

* **Method:**

    `POST`
  
* **Cookies:**
  
  ```typescript
    auth: "fadsf5a437txd764ax7634dxa7b3d4x6"
  ```
  
* **Headers:**

    None

*  **URL Params**

    None

* **Query Params**
    
    None

* **Data Params**
  
  ```typescript
    {
      gameId: integer,
      value: integer
    }
  ```
  Example:
  ```json
    {  
      "gameId": 1,
      "value": 200
    }
  ```

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
      {  
        "id": 1,
        "gameId": 1,
        "value": 200
      }
    ```
    **Headers:**
      
      None
 
* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {
        "message": "User not found!"
      }
    ```
  OR
    * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
      {
        "message": "Invalid gameId or value!"
      }
    ```

* **Notes:**

    None

</details>

**Get results**
----
Return results for the current user

<details>

* **URL**

    /api/users/results

* **Method:**

    `GET`
  
* **Cookies:**
  
  ```typescript
    auth: "fadsf5a437txd764ax7634dxa7b3d4x6"
  ```
  
* **Headers:**

    None

*  **URL Params**

    None

* **Query Params**
    
    None

* **Data Params**
  
  Optional:
  ```typescript
    {
      gameId: integer,
      limit: integer,
      page: integer
    }
  ```
  Example:
  ```json
    {  
      "gameId": 1,
      "limit": 5,
      "page": 2
    }
  ```

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
      [ // НАЧАЛО ОБЪЕКТА
        {
          "gameId": 1,
          "name": "Reaction Time",
          "valueType": "ms",
          "result": [
            {
              "id": 1,
              "value": 200,
              "createdDate (ТУТ ЕЩЁ НЕ ТОЧНОЕ НАЗВАНИЕ)": "дата и время"
            },
            {
              "id": 2,
              "value": 196,
              "createdDate (ТУТ ЕЩЁ НЕ ТОЧНОЕ НАЗВАНИЕ)": "дата и время"
            },
            {
              "id": 3,
              "value": 230,
              "createdDate (ТУТ ЕЩЁ НЕ ТОЧНОЕ НАЗВАНИЕ)": "дата и время"
            }
          ]
        },
        {
          "gameId": 2,
          "name": "Game 2",
          "valueType": "ms",
          "result": [
            {
              "id": 1,
              "value": 200,
              "createdDate (ТУТ ЕЩЁ НЕ ТОЧНОЕ НАЗВАНИЕ)": "дата и время"
            },
            {
              "id": 2,
              "value": 196,
              "createdDate (ТУТ ЕЩЁ НЕ ТОЧНОЕ НАЗВАНИЕ)": "дата и время"
            },
            {
              "id": 3,
              "value": 230,
              "createdDate (ТУТ ЕЩЁ НЕ ТОЧНОЕ НАЗВАНИЕ)": "дата и время"
            }
          ]
        }
      ]
    ```
    **Headers:**
      
      `x-total-count: 3`
 
* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {
        "message": "User not found!"
      }
    ```
  OR
    * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
      {
        "message": "Page without specified limit!"
      }
    ```
  OR
    * **Code:** 404 BAD REQUEST <br />
    **Content:**
    ```json
      {
        "message": "Game with this id not found!"
      }
    ```

* **Notes:**

    None

</details>

**Get leaders of specified game**
----
Return leaders of specified game

<details>

* **URL**

    /api/game/:id/leaders

* **Method:**

    `GET`
  
* **Cookies:**
  
  ```typescript
    auth: "fadsf5a437txd764ax7634dxa7b3d4x6"
  ```
  
* **Headers:**
  
    Required:
    `id=[integer]`

*  **URL Params**

    None

* **Query Params**
    
    None

* **Data Params**
  
  Optional:
  ```typescript
    {
      limit: integer,
      page: integer
    }
  ```
  Example:
  ```json
    {  
      "gameId": 1,
      "limit": 5,
      "page": 2
    }
  ```

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
      [
        {
          "id": 1,
          "nickname": "Sluzer",
          "result": 155
        },
        {
          "id": 2,
          "nickname": "Weborerth",
          "result": 163
        },
        {
          "id": 3,
          "nickname": "Middori",
          "result": 189
        },
      ]
    ```
  
    **Headers:**
      
      `x-total-count: 3`
 
* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {
        "message": "Game not found!"
      }
    ```
  OR
    * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
      {
        "message": "Page without specified limit!"
      }
    ```

* **Notes:**

    None

</details>






