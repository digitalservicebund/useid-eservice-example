# Example eService 

This is an example application for an eService integrating with the UseID identity solution. It shows an example 
on how to use the UseID eService SDK and can be used to test the identification flow. 

## UseId project
> **Important:  This project has been discontinued**
​
This repository is part of the UseId project, that provided the BundesIdent mobile app.  You can find other repositories related to this project in the following list:
​
- Architecture
	- [Architecture](https://github.com/digitalservicebund/useid-architecture/tree/main): Documentation and overview of the UseId architecture
- Backend
	- [Backend](https://github.com/digitalservicebund/useid-backend-service): Kotlin service that acts as the backend for the mobile apps and eID-Service integration for eServices.
- eService
	- [eService-example](https://github.com/digitalservicebund/useid-eservice-example): An example application for an eService integrating with the UseId identity solution.
	- [eService-SDK](https://github.com/digitalservicebund/useid-eservice-sdk): Javascript SDK to easily integrate with the UseId identity solution.
- eID client (mobile app)
	- [iOS client for BundesIdent](https://github.com/digitalservicebund/useid-app-ios)
	- [Android client for BundesIdent](https://github.com/digitalservicebund/useid-app-android)
	- [AusweisApp2 Wrapper iOS](https://github.com/digitalservicebund/AusweisApp2Wrapper-iOS-SPM): Forked repository of the Governikus AusweisApp2 Wrapper for iOS

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

## Note: Prototype Code

This repository includes code used only for a prototype version of the widget. The code is tagged with `// PROTOTYPE` comments.

Find more details about the prototype in this [proposal for a device switch](https://github.com/digitalservicebund/useid-architecture/blob/8b4e0ae9b1536f7d62f8d089b7bc135e71ceba63/research/device-switch/proposal-qr-code-based-device-switch-with-webauthn.md).
