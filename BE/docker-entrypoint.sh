#!/bin/sh

echo "Migrating the database..."
npm run migrate up

echo "Starting the server..."
npm start 