#!make

init: 
	npm run migrate:run && npm run prebuild && npm run start:dev;