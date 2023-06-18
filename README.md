# Angular Application with AutoLogOut Capability

#### If there is no activity within 10 seconds, the user will be automatically logged out.

#### Prerequisites -
1. Node JS
2. MongoDB
<hr />

1. Backend
    - cd backend - Switch to backend directory
    - npm install - Installs the project dependencies
    - node app.js - Starts the backend server
    - The backend will start listening on port 8000
    - A Sample route for signup - http://localhost:8000/api/signup

2. Frontend
    - npm install - Installs the project dependencies
    - ng s -o - Serves the Application frontend on port 4200
    - Frontend URL - http://localhost:4200/login
    - Sample credentials - admin@gmail.com / Admin@123
    - If there is no activity within 10 seconds, the user will be automatically logged out.
<hr />

# AutoLogOut

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
