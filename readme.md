# Chill check api
Node.Js + Express
"Powered by Kubios"

Start server: `npm run dev`
# <h3><b>Usage<b></h3>

1. Clone/download code.
2. Run ```npm i``` inside the project folder
3. Install & start Mysql/MariaDB server
4. Import database script in database branch
5. Create .env file based on .env.sample
6. Start the dev server: npm run dev/npm run start

<h3><b>Link to our frontend and the websites front page:<b></h3>

- https://github.com/Jaakvi/chillcheck-projekti/tree/frontend/front
- https://hyte-server-aura.northeurope.cloudapp.azure.com/etusivu.html


# <h3><b>/api/auth<b></h3>
example queries

```

  #Login
  POST https://hyte-server-aura.northeurope.cloudapp.azure.com/api/users/login
  content-type: application/json
  ## this happens through kubios so you will need to have a kubios account and to implement this, you need your own client-id for Kubios. More important information is in .env.sample
  {
    "username": "john.doe@example.com",
    "password": "Hashed_password4"
  }

  ## Get user by token (requires token)
  GET https://hyte-server-aura.northeurope.cloudapp.azure.com/api/auth/me
  Authorization: Bearer <token>

```
# <h3><b>/api/users<b></h3>

example queries

```
  # Get all users (requires token)
  GET https://hyte-server-aura.northeurope.cloudapp.azure.com/api/users
  Authorization: Bearer <token>

  # Get user by id (requires token)
  GET https://hyte-server-aura.northeurope.cloudapp.azure.com/api/users/:id
  Authorization: Bearer <token>

  # Delete user (requires token)
  DELETE https://hyte-server-aura.northeurope.cloudapp.azure.com/api/users/:id
  Authorization: Bearer <token>

  # Create user (register)
  POST https://hyte-server-aura.northeurope.cloudapp.azure.com/api/users
  content-type: application/json

  {
    "username": "johndoe4",
    "password": "hashed_password4",
    "firstname": "John",
    "lastname": "Doe",
    "email": "email@email.com"
  }

  # Update user's own data (requires token)
  PUT https://hyte-server-aura.northeurope.cloudapp.azure.com/api/users/
  Authorization: Bearer <token>
  content-type: application/json

  {
    "username": "johndoe4",
    "password": "hashed_password4",
    "firstname": "John",
    "lastname": "Doe",
    "email": "email@email.com"
  }

```


# <h3><b>/api/kubios<b></h3>

example queries
```
# Get all Measurement of user that has logged in (requires token)
GET https://hyte-server-aura.northeurope.cloudapp.azure.com/api/kubios/user-data
Authorization: Bearer <token>

# Get the profile data of the user that has logged in
GET https://hyte-server-aura.northeurope.cloudapp.azure.com/api/kubios/user-info
Authorization: Bearer <token>
```

<h3><b>Database structure<b></h3>

![Database structure](database.png)!

<h3><b>Frontend UI<b></h3>


![Front page](Indexhtml.png)

![Login page](loginpage.png)

![Registeration page](registeration.png)

![Profile Page](profilepage1.png)

![Pofile Page](profilepage2.png)

![Profile Page](profilepage3.png)


<h3><b>Known bugs:<b></h3>


1. Some graphical anomalies might happen

<h3><b>To be implemented:<b></h3>
- Updating user information in kubios
- professional verification
- measurement values to database



<h3><b>Refrences:<b></h3>











