#!make

init: 
	npm run prebuild && npm start;


cscheme:	
	chmod +x ./scripts/generate-postgres-migration.sh;
	./scripts/generate-postgres-migration.sh;