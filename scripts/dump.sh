#!/bin/sh
pg_dump -U postgres -p 5050 soundm8 -s -c --if-exists -f docker/database/backup.sql --verbose;
echo "Dump Created at $(date +%s)";
