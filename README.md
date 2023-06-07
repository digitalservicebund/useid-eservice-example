# Example eService 

This is an example application for an eService integrating with the UseID identity solution. It shows an example 
on how to use the UseID eService SDK and can be used to test the identification flow. 

## Contributing

Everyone is welcome to contribute the development of this project. You can contribute by opening pull request,
providing documentation or answering questions or giving feedback. Please always follow the guidelines and our
[Code of Conduct](CODE_OF_CONDUCT.md).

## Contributing code

Open a pull request with your changes and it will be reviewed by someone from the team. When you submit a pull request,
you declare that you have the right to license your contribution to the DigitalService and the community.
By submitting the patch, you agree that your contributions are licensed under the MIT license.

Please make sure that your changes have been tested before submitting a pull request.

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
http://localhost:8081/health 
```
should return Ok
