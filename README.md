## Chain Deploy Dashboard
![version](https://img.shields.io/badge/version-0.1.0beta-blue)
![license](https://img.shields.io/badge/license-MIT-blue.svg)
[![Follow](https://img.shields.io/twitter/follow/consensolabs?style=social&logo=twitter)](https://twitter.com/consensolabs)

## Pre requisites

The web project needs a local REST API backend server for testing

You can easily setup the backend locally with docker. Make sure you have setup docker and docker compose.

* Clone the REST API project

	```
	git clone https://github.com/arbchain/devops
	```

* Run the docker componse from the `ansible-rest-api` directory

	```
	cd devops/ansible-rest-api
	docker-compose up -d
	```
* Make sure that the REST API end point is running at port `8000` by checking the docker processes
	```
	docker ps
	```


## Quick start

- Make sure your NodeJS and npm versions are up to date for `React 16.8.6`

- Install dependencies: `npm install` or `yarn`

- Start the server: `npm run start` or `yarn start`

- Views are on: `localhost:3000`



## 🖌 Design Files


👉[Download Figma file](https://devias.s3.eu-west-2.amazonaws.com/products/react-material-dashboard/react-material-dashboard-free.fig)

## Credits

The project is bootstrapped with the help of [react-material-dashboard](https://github.com/devias-io/react-material-dashboard)
