# Frontend Application README

TRUENORT Frontend code challenge application! This README will guide you through setting up and running the project.

## Requirements

- Node.js v20.11.0
- npm v10.2.4

## Getting Started

To get started, follow these simple steps:

1. Clone this repository to your local machine.
2. Use the correct node and npm version.
3. Install dependencies by running `npm install`.
4. Add the .env file with:
   ```dosini
   VITE_APP_API_URL='http://localhost:3000/'
   ```
5. Make sure that your api is running on the value specified in VITE_APP_API_URL.
6. Depending on your preference, run `npm run dev` to start the development server or `npm run build` and `npm run preview` for prod version.

## Main Stack

Our frontend application is built using the following technologies:

- **Vite**: Fast, opinionated web dev build tool that serves your code via native ES modules.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Material-UI**: React components for faster and easier web development.
- **Formik**: Form library for React.
- **Jest**: Delightful JavaScript Testing Framework with a focus on simplicity.
- **React Testing Library**: Testing utilities for React components.
- **Redux Toolkit**: Package to simplify Redux logic and manage application state.

## Infrastructure

Our frontend application architecture is based on Atomic Design principles and Redux Toolkit design patterns.

## CI/CD

We utilize GitHub Actions for automating our CI/CD pipeline. GitHub Actions are configured to:

- Format code
- Lint code
- Run tests
- Build the project

## Cloud

Our application is deployed on Vercel. We chose Vercel for its simplicity, scalability, and ability to seamlessly integrate with our frontend build process.

## Code Coverage

We are proud to achieve almost 75% code coverage in our tests, ensuring the reliability and stability of our application.

It's important to mention that we omitted some tests since they were repetitive. For this code challenge, we focused on creating the most important tests.

For more information, refer to the [backend solution provided](https://github.com/Wainercrb/LP-Code-Challenge-Backend/tree/main?tab=readme-ov-file#solution-provided).


## Demo

You can check the demo [here](https://lp-code-challenge-frontend.vercel.app)


https://github.com/Wainercrb/LP-Code-Challenge-Frontend/assets/25513765/d223c006-2456-4c48-9814-f3d77e691905

## Issues(to be fixed soon)

- I found an issue regarding the app middleware: if we reload the page on a path that is not the root, we get a 404 error code.

- The token cookie is reset when the page is reloaded, which occurs in specific browsers. Consequently, users need to re-sign in.




