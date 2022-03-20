## 👨‍💻 ReactJS - JWT Bearer Token Authentication (without Redux) 

This is a complete example of the user authentication using ReactJS as Front-End. On the other hand, the Back-End login server has been written using JS. As DB is used MongoDB.

## ✅ Front-End Installation

In main folder:
```bash
npm install
```

## 📜 Front-End Usage

In main folder:
```bash
npm start
```

## ✅ Back-End Installation
Go in `/server` and subsequently:
```bash
npm install
```

## 📜 Back-End Usage
To start the server, go in `/server` and then:
```bash
node server.js
```

## 📫 Set port (Front-End)
.env
```
PORT=8081
```

## 📧 Email Service Configuration 
Open `/server/app/config/auth.config.js` and modify `the fields with your automatic email user and password`. Set also the secret for the JWT token. 

```js
module.exports = {
  secret: "",
  user: "", 
  pass: "", 
};
```

## 🗄️ DB Configuration 
Open `/server/app/config/db.config.js` and modify `the db connection variables`. It has been used MongoDB as database.

```js
module.exports = {
  HOST: "localhost",
  PORT: 27017,
  DB: "dbTest"
};
```

## 📤 Nodemailer configuration 
Open ` /server/app/config/nodemailer.config.js` and modify `the smtp server for the automatic email`.

```js
const transport = nodemailer.createTransport({
  host: 'smtp.emailServer.com',
  port: 465,
  secure: true,
  auth: {
    user: user,
    pass: pass,
  },
});
```

# 🕹️ REST API

The REST API are used from the back-end to interact with the input data of the front-end. Below are explained the API used. Below it has explained only the API for auth and login, but there are others API to interact after login. See `/server/app/routes`.

## 🎮 Signup

This API is used for user registration.

### Request

`POST /api/v1/auth/signin`

    {
      "username": "mariorossi",
      "email": "mrossi@example.com",
      "password": "provaprova",
      "firstName": "Mario",
      "lastName": "Rossi",
      "dateOfBirthday": "1987-04-05",
      "sex": "male",
      "country": "Italy",
      "city": "Milan",
      "address": "Corso Como 238",
      "postCode": "10020",
      "phonePrefix": "+39",
      "phoneNumber": 33333333333,
      "userType":"user" 
    }

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## 🎮 Login

This API is used for login.

### Request

`POST /api/v1/auth/signin`

    curl -i -H 'Accept: application/json' -d 'email=Foo&password=new' http://localhost:8080/api/v1/auth/signin

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {"id":1,"name":"Foo","roles":"user"}

## 🎮 Confirmation code Email
This API is used to confirm the user registration.

### Request

`GET http://localhost:8080/api/v1/auth/confirm/:confirmationCode`

    curl -i -H 'Accept: application/json' http://localhost:8080/api/v1/auth/confirm/:confirmationCode

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {"id":1,"name":"Foo","status":"new"}

## 🎯 Contributing
@dalecosta1

## 📝 License
[MIT](https://choosealicense.com/licenses/mit/)