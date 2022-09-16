# Example eService 

This is an example application for an eService integrating with the UseID identity solution. It shows an example 
on how to use the UseID eService SDK and can be used to test the identification flow. 

## Install

Install all required dependencies:
```
npm i
```

## Config

Copy `.env.example` to `.env` and adapt the configuration according to your setup. 

## Build

Build the SDK:
```
npm run build-sdk
```

## Run

Run the application:
```
npm start
```

Or run for development with automatic re-compilation (including the SDK) enabled:
```
npm run dev
```

## Check App health
```
http://localhost:8080/health 
```
should return Ok