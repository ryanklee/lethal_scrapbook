#!/bin/bash

# Wait for PostgreSQL to be ready
until psql $DATABASE_URL -c '\q'; do
  >&2 echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "PostgreSQL is up - executing command"

# Execute SQL statements from init-db.sql
psql $DATABASE_URL -f init-db.sql

# Start the server
exec node server.js
