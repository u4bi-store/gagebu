## Usage

```bash
$ npm i

$ npm run test

$ npm run dev:server:watch
$ npm run dev:client
# npm run dev
```

#### Seed Database

```ts
// src/bin/www.ts
sequelize.run(sequelize.init(), {
  force: true, 
  seed: true
})
```

```sql
 id |      email       
----+------------------
  1 | ej88ej@gmail.com

 id | amount |   text   |  date   | userId 
----+--------+----------+-----------------
  1 |   8000 | 된장찌게 | 2019-08 ~ |      1 
```

#### API

Auth
```
POST /auth/login/
{ 
  email: 'ej88ej@gmail.com',
  password: '1'
}

GET /auth/profile/

POST /auth/logout/
```

Expenses
```
GET /api/expenses/

GET /api/expenses/:id

POST /api/expenses/
{
  text: '갈비탕',
  amount: 9000
}

PUT /api/expenses/:id
{
  text: '갈비찜덮밥',
  amount: 6000
}

DELETE /api/expenses/:id
```