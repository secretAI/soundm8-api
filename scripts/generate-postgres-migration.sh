#!/bin/sh
SCHEME_FILE_NAME="base-scheme.sql";
SCHEME_FILE_PATH="./docker/postgres/$SCHEME_FILE_NAME";

if ! test -f $SCHEME_FILE_PATH; then
  mkdir ./docker/postgres && cd postgres && touch $SCHEME_FILE_NAME;
fi

pg_dump -U postgres -p 5050 soundm8 -s -c --if-exists -f $SCHEME_FILE_PATH --verbose;
echo "Scheme copy created at $SCHEME_FILE_PATH\nTimestamp: $(date +%s)";