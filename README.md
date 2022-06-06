# 🍔 Nextfood BackEnd

> FrontEnd Project: https://github.com/GabrielNogueiraBR/nextfood-frontend

This project contains the backend of the Nextfood application, containing all the API that will serve the frontend of the application.<br>
The project presented here is responsible for receiving requests from the client, performing the proper manipulation of data, and making the connection with the database so that it is possible to persist and retrieve the data.

## 💡NextFood Features
- [x] Application Setup
- [x] CRUD Restaurant
- [x] CRUD Categories
- [x] CRUD User
- [x] CRUD Franchise
- [x] CRUD Products
- [x] CRUD Tables
- [ ] CRUD Orders
- [ ] CRUD Cart
- [x] Deploy at Heroku

## NextFood API Documentation
To access all API documentation containing the available routes along with the respective contracts, access the `/docs` route running the application locally, or access the following link on heroku.
> https://nextfood-backend.herokuapp.com/docs/
---
## Technologies

- [NestJs](https://docs.nestjs.com/)<br>
  <blockquote>Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).</blockquote>
  Framework used to create an http server using express.js underneath, through NestJs it was possible to create from the routes to the repositories necessary to persist the data. In addition to the possibility of creating middleware to handle requests.
<br>

- [TypeOrm](https://docs.nestjs.com/recipes/sql-typeorm)<br>
  <blockquote>TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript.</blockquote>
  ORM used to integrate with the Postgres database, facilitating the construction of queries to access the database. Having integration with NestJs makes the library configuration process much easier.
<br>

- [Swagger](https://docs.nestjs.com/openapi/introduction)<br>
  <blockquote>Simplify API development for users, teams, and enterprises with the Swagger open source and professional toolset. Find out how Swagger can help you design and document your APIs at scale.</blockquote>
Used to automatically generate API documentation, through the `/docs` route, containing all available routes along with the respective contracts.
<br>

- [Docker](https://www.docker.com/)<br>
  <blockquote>Docker takes away repetitive, mundane configuration tasks and is used throughout the development lifecycle for fast, easy and portable application development – desktop and cloud. Docker’s comprehensive end to end platform includes UIs, CLIs, APIs and security that are engineered to work together across the entire application delivery lifecycle.</blockquote>
Used to create application containers, facilitating deployments.
<br>

- [Heroku](https://heroku.com/)<br>
  <blockquote>Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.</blockquote>
  Used to host our application in the cloud, through the 'container registry' taking advantage of the docker configured for the application.
<br>

---

## Local Setup

### Requirements
1. Make sure **Node JS** is installed on your machine by running:
```bash
node -v
```

2. If you have not installed the **Node JS**, use the following link to download 16.x version and install it: [Download NodeJS](https://nodejs.org/en/)

### Setup

1. Clone the [repository](https://github.com/GabrielNogueiraBR/nextfood-backend) 
`git clone https://github.com/GabrielNogueiraBR/Monext.git`

2. Copy `.env.schema` as `.env` and adjust environment variables according to instructions provided on itself.

3. Install `pnpm` package manager:

```sh
npm i -g pnpm
```

4. Install dependencies:

```sh
pnpm i
```

The advantage of using `.env` methodology is being able to locally boot a containerized version of your application without further configurations.

5. If everything was properly set up, you may run the application either with live reload or containerized:

**Live Reload**

```sh
pnpm dev
```

**Containerized**

```sh
pnpm docker
```

6. To ensure application is running correctly navigate to health check APP:

http://127.0.0.1:8080/


### Testing

Tests are based on [Jest](https://jestjs.io/) framework and its typings for development should be automatically recognized after installing project dependencies. 

Test files are recognized for processing through the `*.spec.ts` pattern. By default they should be created at the same directory of its implementation counterpart.

To run tests execute the built-in script:

```sh
pnpm test
```

### Debugging

Application is configured to expose Node.js debug socket when being boot through live reload.

Which means you may attach a debugger at target port in order to enable code breakpoints.

Configuration is already done fo VSCode users which may simply start debugging by running:

```sh
pnpm dev
[press F5]
```

### Linting

This repository is configured with linting rules.

It is recommended to configure your IDE to automatically apply auto-fixes. Details on how to do so for IntelliJ, VSCode, Sublime Text and Atom are available at the following article:

[Even faster code formatting using ESLint](https://medium.com/@netczuk/even-faster-code-formatting-using-eslint-22b80d061461)

You may use a built-in NPM script to run a full lint check and print execution report:

```sh
pnpm lint
```

### Committing

Commit messages follows conventions of [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional), which in short accepts one of its `types` followed by a scope (optional) and a description.

**Types**

```sh
build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
```

**Examples**

```sh
feat(user): add user manipulation
fix: JSON parsing exception
chore(auth): change member accessibility
ci: fix wrong build definition
```

## 👨‍👦‍👦 Contributors
<div align="center">
 <a href="https://github.com/GabrielNogueiraBR" target="_blank"><img src="https://avatars.githubusercontent.com/u/30303558?v=4" width="8%"></a>
 <a href="https://github.com/VitorGois" target="_blank"><img src="https://avatars.githubusercontent.com/u/69533533?v=4" width="8%"></a>
 <a href="https://github.com/CordeiroOtavio" target="_blank"><img src="https://avatars.githubusercontent.com/u/69653683?v=4" width="8%"></a>
 <a href="https://github.com/ryanraul" target="_blank"><img src="https://avatars.githubusercontent.com/u/42502534?v=4" width="8%"></a>
 <a href="https://github.com/gferrazz" target="_blank"><img src="https://avatars.githubusercontent.com/u/48798017?v=4" width="8%"></a>
</div>

## 📃 License
This software is under the MIT License.
