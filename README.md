# Example eService 

This is an example application for an eService integrating with the UseID identity solution. It shows an example 
on how to use the UseID eService SDK and can be used to test the identification flow. 

## Install

Install all required dependencies:
```
npm i
```

## Build

Build the SDK:
```
npm run build-sdk
```

## Run

Run the application on port 8080:
```
npm start
```

Or run for development with automatic re-compilation enabled:
```
npm run dev
```

## Check App health
```
http://localhost:8080/health 
```
should return Ok

## Build the UseID SDK

Build the SDK distribution files:
```
npm run build-sdk
```
