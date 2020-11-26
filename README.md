# sarvsahayak-api
This is an API for interaction between client side app and database of sarvsahayak app. Input output is done in JSON format.

Variable used:

{{url}} : https://sarvsahayakapi.herokuapp.com

## user side routers

**Note:** *For types of fields visit [User router](./src/models/user.js) and [Complaint router](./src/models/complaint.js)*

### create user

***url:*** {{url}}/users

***method:*** POST

```
required fields:

1. name
2. email
3. password
4. mobileNo

optional fields:

1. avatar

```

### login user

***url:*** {{url}}/users/login

***method:*** POST

```
required fields:

1. email
2. password

```


### logout user

***url:*** {{url}}/users/logout

***method:*** POST

```
required fields: no need
```

### logoutAll user

***url:*** {{url}}/users/logoutAll

***method:*** POST

```
required fields: no need
```


### create complaint

***url:*** {{url}}/complaints

***method:*** POST

```
required fields:

1. description
2. category
3. address
4. lat
5. long

optional fields:

1. status (default: 0)

```
