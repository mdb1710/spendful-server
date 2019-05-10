# Spendful

Michael Bonner, Ethan Zimmerman, Andre Willie, Zoljargal Fallows, and Chris Carnivale

[LiveApp](http://spendful.now.sh)
[Client Repo](https://github.com/thinkful-ei-armadillo/spendful-client)

## Summary

Reach your financial goals by tracking every dollar you spend and earn.  This app allows you to 
add all of your incomes and expenses and visualize them through convenient charts and graphs.  The
front-end utilizes React to create a responsive design.  The back-end leverages the RRule library to allow
for recurring expenses.

## Endpoints

### Authorization/User Endpoints

###### `post /api/auth/token`
Verifies credentials for logins

###### `get /api/auth/refresh`
Allows automatic refreshing of token

###### `post /api/user`
Handles registration/sign-up

### Categories Endpoints

##### `get /api/categories`
Retrieves all categories for user and default categories for new users

##### `post /api/categories`
Allows user to add new categories

##### `get /api/categories/:id`
Retrieves single category based on id provided

##### `patch /api/categories/:id`
Allows user to make changes to a category based on id provided

##### `delete /api/categories/id`
Allows user to delete a category based on id provided

### Expense Endpoints

##### `get /api/expenses`
Retrieves all expenses for the user

##### `post /api/expenses`
Allows user to add a new expense

##### `get /api/expenses/:id`
Retrieves single expense based on id provided

##### `delete /api/expenses/:id`
Allows the user to delete an expense based on id provided

##### `patch api/expenses/:id`
Allows the user to make changes to an expense based on id provided

### Income Endpoints

##### `get /api/incomes`
Retrieves all incomes for the user

##### `post /api/incomes`
Allows user to add a new income

##### `get /api/incomes/:id`
Retrieves single income based on id provided

##### `delete /api/incomes/:id`
Allows the user to delete an income based on id provided

##### `patch api/incomes/:id`
Allows the user to make changes to an incomes based on id provided

### Reports Endpoints

##### `get /api/reports/:year`
Retrieves incomes and expenses for a calendar year for the user

##### `get /api/reports/:month/:year`
Retrieves incomes and expenses for a given month and year for the user

## Technology Used
- RRule
- Joi
- Luxon

The Usual Suspects: 

- Node
- Express
- PostgreSQL
- Knex.js
- Mocha, Chai, Supertest

Deployed via Heroku

  Special thanks to rrule and luxon for doing all the complex date math and 
  preserving our sanity (mostly) 

## Local dev setup

Set-up .env file with

```
NODE_ENV=
PORT=
DB_MIGRATION_USER= 
DB_MIGRATION_PASS= 
DB_MIGRATION_HOST= 
DB_MIGRATION_PORT= 
DB_MIGRATION_DATABASE=
DATBASE_URL=
TEST_DB_URL=
JWT_SECRET=
JWT_EXPIRY=
```


If using user `postgres`:
```

createdb -U postgres spendful
createdb -U postgres spendful_test
```
If your `postgres` user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```
npm install
npm run migrate
env MIGRATION_DB_NAME=spaced-repetition-test npm run migrate

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate 0`

Seed data in the terminal with `psql -U postgres -d spendful  -f ./seeds/seed_data.sql`
