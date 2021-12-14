# Booking System UI 

A front-end project bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

```bash
$ npm install
```

## Configuration

Create an `.env` file in the project root by following and fill the values according to `.env.example`. 

An example can be found below:

```yml
REACT_APP_BOOKING_API_BASEURL=http://127.0.0.1:8080 # endpoint backend application is running on
```

## Running the app

```bash
# development
$ npm run start 
```



## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

# Deployment

Builds the image with specified db endpoint.
```
docker build . -t bs-ui
```


Runs an instance of the image on port 3000 of your machine.
```
docker run --rm -it -p 3000:80 bs-ui
```
