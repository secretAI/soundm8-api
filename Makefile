#!make

init: 
	npm run prebuild && npm start;

genmgr:	
	chmod +x ./scripts/generate-postgres-migration.sh;
	./scripts/generate-postgres-migration.sh;
