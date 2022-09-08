#!/bin/sh
TIMESTAMP="$(date +%s)"
FILE_NAME="migration$TIMESTAMP.sql";
FILE_PATH="./src/migrations/$FILE_NAME";

if ! test -f $FILE_PATH; then
  mkdir ./src/migrations && cd migrations && touch $FILE_NAME;
fi

pg_dump -U postgres -p 5050 soundm8 -s -c --if-exists -f $FILE_PATH --verbose;
echo "\nMigration created at: [ $FILE_PATH ]\nTimestamp: [ $(date -jnRu) ]";

exit 0 
