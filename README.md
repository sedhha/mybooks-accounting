# MyBooks Accounting Web Application

This is a submission web application for [Intuit Coding Challenge Full Stack](https://assessment.hackerearth.com/challenges/new/hiring/intuit-fullstack-software-engineer-hiring-challenge/).

## Tools and Technologies used

The framework used for this application is NEXT JS which means:

- React for the Frontend
- Node for the Backend


## Installation and setup:

I am using node version 18 and would recommend testing with the same version. One can always switch node versions using node version manager with this command: `nvm use 18`. If the version is already not installed, use this command:

```bash
>> nvm install 18
>> nvm use 18
```

However make sure that `node version manager` is installed in your system. If not, [here](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) is the guide on how to do so.

Run the following commands one by one. (I have used yarn however you may use npm as well).

```bash
>> git clone https://github.com/sedhha/mybooks-accounting.git
>> cd mybooks-accounting
>> yarn
```

Now to spin up the dev server:

```bash
>> yarn dev
```
Now the server should be up and running on this [link](http://localhost:3000).

## Code Details

In this section, I am mentioning the details of different items involved. 
Folder structure:

```bash
- mybooks-accounting
  - interfaces // Contains all the typed definitions and interfaces
    - FormSelection.ts
    - index.ts // Contains all the exported items
    - NavBar.ts
    - components // Contains all the frontend components used in the project
        - Common // Contains all the common project components used at multiple places
        ...
    ...
```


At very high level we have:

### Frontend

Frontend majorly consists of two components:

- [Login Screen](components/Login)
- [Customer Screen](components/Customer)
- [Expert Screen](components/Expert)


### Backend

As per the problem statement, fixed types of tasks are kept at this [json](constants/requests.json). One can always add, edit or remove from the existing json and accordingly it would reflect on UI and backend.

#### Middleware

In order to create account, the user must request to: 
{{baseURL}}/api/admin/add-users?userType=Customer&userType=Expert

where baseURL is https://mybooks-accounting.vercel.app.

I wanted to include Bearer authentication but ended up using normal `Authorization` header. The header secret token is added in the attachment `.env` file where variable name is `ADMIN_ID`.

Here's the curl command for the same:

```bash
curl --location --request GET 'https://mybooks-accounting.vercel.app/api/admin/add-users?userType=Customer&userType=Expert' \
--header 'Authorization: <SecretToken ADMIN_ID From .env FILE>'
```

The above endpoint is secured by middleware interceptor that can be found [here](backend/middleware).

#### APIs

All APIs can be found [here](backend/apis).

#### Database

Currently all the data is stored in JS memory and for that reason user creation is restricted to upto max 50 users and task creation is restricted to upto max 1000 tasks per user. The implementation can be found in this [file](backend/process/index.ts).

One can view all the users using admin API by making get call to: 

```bash
curl --location --request GET 'https://mybooks-accounting.vercel.app/api/admin/get-all-users' \
--header 'Authorization: <SecretToken ADMIN_ID From .env FILE>'
```

### Unit Testing

I didn't got much time to complete unit testing part but have added two minor unit tests to match against existing snapshots and mock some of the functionalities. These tests can be found [here](__tests__/customer-view.test.tsx).

### CI/CD (Github Actions)

The unit tests that I have added have been integrated also with [github actions](.github/workflows/jest-unit-tests.yml). Here the secrets are injected to `.env` file from github actions itself and then all the CI tests run.

## Appendix


### Message for the Evaluators

As mentioned in the question here:

![Description of Question](docs/images/2023-03-05-09-38-45.png)

and then in the bottom section:

![Backend Requirements of the Question](docs/images/2023-03-05-09-40-00.png)

I got little confused if it is open to any backend technology or not. However, the question got me giving it a try so here I have created it with Node. I didn't use springboot as I have never coded in the same. I am familiar to Scala Play Framework though.

This was just to save the time and I am well aware of restful API, devops, CI/CD and backend concepts. I can pick up any framework pretty quickly (Java | SpringBoot) as the core concepts remain the same. :)

For any question or queries, feel free to reach out to me @ activity.schoolsh2@gmail.com.
