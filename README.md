
# Assignment I 
# COMP 3133 – Full Stack Development – II

## Backend application using NodeJS, Express, GraphQL and MongoDB

Following is the list of to develop which accept all data as 
JSON Object whenever needed:

| Method       | Operations          | Description  |
| ------------- |:-------------:| -----:|
|Mutation      | Signup | Allow user to create new account |
| Query      | Login      |   Allow user to access the system |
| Query| Get all employees      |    User can get all employee list |
| Mutation| Add New employee      |    User can create new employee |
| Query| Search employee by eid     |    User can get employee details by employee id |
| Mutation| Update employee by eid      |    User can update employee details |
| Mutation| Delete employee by eid      |    User can delete employee by employee id |

### Users Collection

| Field Name      | Type         | Constraint  |
| ------------- |:-------------:| -----:|
|_id      | Object ID | Auto Generate |
| username      | String      |   Primary Key |
| email| String     |    Unique |
| password| String     |    May be encrypted with other fields |

### Employee Collection

| Field Name      | Type         | Constraint  |
| ------------- |:-------------:| -----:|
|_id      | Object ID | Auto Generate |
| first_name      | String      |   Required |
| last_name| String     |    Required|
| email| String     |    Unique |
| gender| String     |    Male/Female/Other |
| salary| Float     |    Required |




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` 

`DATABASE_URL` - URL to MongoDB database **REQUIRED**




## Run Locally

Clone the project

```bash
  git clone https://github.com/starryskyyy/101337015_COMP3133_Assignment1
```

Go to the project directory

```bash
  cd 101337015_COMP3133_Assignment1

```

Install dependencies

```bash
  npm install body-parser dotenv cors express mongoose graphql nodemon apollo-server-express

  npm install --save-dev nodemon

```

Start the server

```bash
  nodemon server.js
```

## Authors

- [@starryskyyy](https://github.com/starryskyyy) :sparkling_heart:



