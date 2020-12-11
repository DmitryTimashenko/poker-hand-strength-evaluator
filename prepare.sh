#!/bin/bash

apt-get update -yq
apt-get install curl gnupg -yq
curl -sL https://deb.nodesource.com/setup_11.x | bash
apt-get install nodejs -yq
apt-get install npm -yq

npm install
npm run-script build