# Fast React Pizza Co.

A pizza ordering application built with Vanilla React, TailwindCSS and a special API written by Jonas Schmedttman who is a lecturer in Udemy. This app design is also coming from him, i just implemented a TypeScript version of this project on my own.

A detailed production is available, [deployed with AWS Amplify](https://main.d3mr8h1idwg5of.amplifyapp.com)

## Features

- Pizza ordering with no authentication needed
- A detailed menu section which comes from an API
- Efficient Geolocation API usage
- Responsive design with TailwindCSS
- Advanced React Router features
- Modern Redux Toolkit features
- Organized `src/` structure
- Optimized performances with the lazy loading features
- Better performance with Vite and TypeScript

### Installation

1. Clone the repository
2. Install the dependencies:
```
npm install # 'npm i' for short
```
3. Create a .env file in the root directory and paste the followings:
```
VITE_PORT={optional}
VITE_BASE_API_URL=https://react-fast-pizza-api.onrender.com/api
VITE_GEOCODING_API_URL=https://api.bigdatacloud.net/data/reverse-geocode-client
```

### Starting the app

Application can be run with two modes such as;
```
npm start
```
or
```
npm run dev
```

`dev` mode is for the on-change refreshment.

## Project Structure
```
src/
├── features/               # Specialized components with the global and local state
   ├── cart/
   ├── menu/
   ├── order/
   ├── user/
├── models/                 # Some types and interfaces for the modern TypeScript features
├── services/               # Useful functions that makes API bindings
├── ui/                     # More generalized UI components
├── utils/                  # More generalized application functions
├── App.tsx                 # Main that will be rendered
├── index.css               # the CSS file that's been using for this app
├── main.tsx                # The file that render the App.tsx to the index.html
├── vite-env.d.ts           # Declared Vite rules for TypeScript
```

## License

This project is open source and available under the MIT License, the restaurant API and web design features are coming from Jonas Schmedttman who is a lecturer in Udemy. Special thanks to him :D



