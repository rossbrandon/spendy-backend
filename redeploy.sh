#!/bin/bash

echo "-------------------------------"
echo "Stage: Pull from github - Begin"
echo "-------------------------------"

# change to project directory - required for forever for some reason
cd /home/bitnami/stack/projects/spendy-backend || exit

git pull

echo "-----------------------------"
echo "Stage: Pull from github - End"
echo "-----------------------------"

echo "-----------------------"
echo "Stage: Redeploy - Begin"
echo "-----------------------"

echo "Previous process:"
forever list | grep 'spendy-backend'

echo "Restarting app server..."
if forever list | grep 'spendy-backend'; then forever stop spendy-backend; fi
forever -a --uid spendy-backend start dist/main.js

echo "New process:"
forever list | grep 'spendy-backend'

echo "---------------------"
echo "Stage: Redeploy - End"
echo "---------------------"
