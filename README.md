# hookup-app-vue
# Meetup Now App

## Overview

The Meetup Now app allows users to propose instant meetups with people nearby within specified distances. The application includes user authentication and ensures only authenticated users can access the meetup functionalities.

## Features

- User Authentication (Login, Register)
- Propose a meeting within 15 minutes
- Search for users within 100m, 500m, or 1km radius
- Real-time location updates

## Project Structure
├── public
│ ├── favicon.ico
│ └── index.html
├── src
│ ├── assets
│ ├── components
│ │ ├── Auth
│ │ │ ├── Login.vue
│ │ │ ├── Register.vue
│ │ ├── Meetup
│ │ │ ├── ProposeMeetup.vue
│ │ ├── HelloWorld.vue
│ ├── router
│ │ └── index.ts
│ ├── store
│ │ ├── auth.ts
│ │ ├── meetups.ts
│ │ └── index.ts
│ ├── views
│ │ ├── HomeView.vue
│ │ ├── LoginView.vue
│ │ ├── RegisterView.vue
│ ├── App.vue
│ ├── main.ts
│ └── shims-vue.d.ts
├── tests
│ ├── e2e
│ ├── unit
├── .gitignore
├── babel.config.js
├── package.json
├── tsconfig.json
├── vue.config.js
└── README.md


## Setup and Installation

#### Clone the repository
```bash
git clone https://github.com/yourusername/meetup-now-app.git
cd meetup-now-app
```

#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Run your unit tests
```
npm run test:unit
```

#### Run your end-to-end tests
```
npm run test:e2e
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Architecture

The application follows a modular structure, separating concerns into different modules for authentication and meetup functionalities. Vuex is used for state management, ensuring a single source of truth for the application's state.

## Sequence Diagram

```plaintext
User -> App: Opens App
App -> AuthService: Check Authentication
AuthService -> App: Authenticated
User -> App: Propose Meetup
App -> LocationService: Get Nearby Users
LocationService -> App: Nearby Users List
App -> User: Show Nearby Users
User -> App: Select User to Meet
App -> Selected User: Send Meetup Request
Selected User -> App: Accept/Reject Meetup
App -> User: Show Meetup Status
```

## Class Diagram
```plaintext
+---------------------+         +---------------------+
|      User           |<------->|      Meetup         |
+---------------------+         +---------------------+
| - id: String        |         | - id: String        |
| - name: String      |         | - proposerId: String|
| - email: String     |         | - location: Object  |
| - password: String  |         | - time: Date        |
+---------------------+         +---------------------+
         ^                               |
         |                               |
         |                               v
+---------------------+         +---------------------+
|     AuthService     |         |  LocationService    |
+---------------------+         +---------------------+
| + login()           |         | + getNearbyUsers()  |
| + register()        |         +---------------------+
+---------------------+
```

### Launch android studio and compile :

npm install @capacitor/core @capacitor/cli
npx cap init
npm install @capacitor/android
npx cap add android

npm run build
npx cap copy
npx cap sync
npx cap open android
