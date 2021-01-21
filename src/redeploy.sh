#!/bin/bash

# change to project directory - required for forever for some reason
cd /home/bitnami/stack/projects/spendy-backend || exit

if forever list | grep 'spendy-backend'; then forever stop spendy-backend; fi
forever -a --uid spendy-backend start /home/bitnami/stack/projects/spendy-backend/dist/main.js
