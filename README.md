# sarvsahayak-api
This is an API for interaction between client side app and database of sarvsahayak app. Input output is done in JSON format.

Variable used:

{{url}} : https://sarvsahayakapi.herokuapp.com

## user side routers

**Note:** *For type of fields visit [User router](./src/models/user.js) and [Complaint router](./src/models/complaint.js)*

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

### read profile

***url:*** {{url}}/users/me

***method:*** GET


### read complaints

***url:*** {{url}}/complaints

***method:*** GET

```
query params:

1. status
  eg-> ?status=0
2. sortBy
  eg-> ?sortBy:category=desc
3. limit
  eg-> ?limit=3
4. skip
  eg-> ?skip=4
```

### read complaint

***url:*** {{url}}/complaints/:id

***method:*** GET


### update user

***url:*** {{url}}/users/me

***method:*** PATCH

```
allowed fields:

1. password
2. mobileNo

optional fields:

1. avatar

```

### update complaint

***url:*** {{url}}/complaints/:id

***method:*** PATCH

```
allowed fields:

1. description
2. status

```

### delete user

***url:*** {{url}}/users/me

***method:*** DELETE


### delete complaint

***url:*** {{url}}/complaints/:id

***method:*** DELETE

### upload avatar

***url:*** {{url}}/users/me/avatar

***method:*** POST

```
required fields:

1. avatar

```

### delete avatar

***url:*** {{url}}/users/me/avatar

***method:*** DELETE

### see profile pic

***url:*** {{url}}/users/:id/avatar

***method:*** GET



## client side routers

**Note:** *For type of fields visit [Client router](./src/models/ngo.js) and [Complaint router](./src/models/complaint.js)*

### create client

***url:*** {{url}}/ngos

***method:*** POST

```
required fields:

1. name
2. email
3. password
4. mobileNo
5. categories
6. lat
7. long

optional fields:

1. avatar

```

### login client

***url:*** {{url}}/ngos/login

***method:*** POST

```
required fields:

1. email
2. password

```


### logout client

***url:*** {{url}}/ngos/logout

***method:*** POST

```
required fields: no need
```

### logoutAll client

***url:*** {{url}}/ngos/logoutAll

***method:*** POST

```
required fields: no need
```


### read complaints

***url:*** {{url}}/ngos/complaints

***method:*** GET

```
query params:

1. status
  eg-> ?status=0
2. sortBy
  eg-> ?sortBy:category=desc
3. limit
  eg-> ?limit=3
4. skip
  eg-> ?skip=4
```



### update client

***url:*** {{url}}/ngos/me

***method:*** PATCH

```
allowed fields:

1. password
2. mobileNo

optional fields:

1. avatar

```

### update complaint

***url:*** {{url}}/ngos/complaints/:id

***method:*** PATCH

```
allowed fields:

1. status

```


### delete client

***url:*** {{url}}/ngos/me

***method:*** DELETE

### upload avatar

***url:*** {{url}}/ngos/me/avatar

***method:*** POST

```
required fields:

1. avatar

```

### delete avatar

***url:*** {{url}}/ngos/me/avatar

***method:*** DELETE

### see profile pic

***url:*** {{url}}/ngos/:id/avatar

***method:*** GET
