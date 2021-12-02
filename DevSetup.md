# Developer Project Setup

This was initially done from scratch.  Later, I started using Visual Studio Code.

## [Create New React App](https://reactjs.org/docs/create-a-new-react-app.html)
to enable Node development on your pc

## [Install Node.js](https://nodejs.org/en/download/)
install nodes.js

Fork or otherwise copy download the project:

[DialogEngine on GitHub](https://github.com/sascanagl/DialogEngine)

cd to the DialogEngine root project directory

## Might have to:

> * npm install react-scripts --save
> * npm install  (again to update package-lock.json -- if needed)
> * npm start  (confirm basic app runs)

and then in your browser:

> **localhost:3000** (note using localhost:3000 directly)

exit the runtime  (Win: Ctrl-C) unless you want to experiment with it running

npm install react-hot-loader --save-dev  (probably not needed)
		

# Once you have confirmed it runs....

If you care, you can create and run in local Docker. To do so, you should install and use [Docker Desktop](https://www.docker.com/products/docker-desktop), then:

> [Dockerize React Apps](https://mherman.org/blog/dockerizing-a-react-app/)

if not done before:

> **docker build -t dialog-engine:latest .**

then on Windows PowerShell use \$\{PWD\}, on Linux  (Ubunto)  use  \$\{pwd\} :

>docker run
>>	-it \
	--rm \
	-v ${PWD}:/app \
	-v /app/node_modules \
	-p 3001:3000 \
	-e CHOKIDAR_USEPOLLING=true \
	dialog-engine:latest

and then in your browser:

> **localhost:3001** (note app thru docker on port 3001)

# Preparing for [AWS Polly](https://aws.amazon.com/polly/)

A future iteration of this application is going to demonstrate the use of AWS Polly 
for optional text-to-speech synthesis of game content.

[Install the Node.js AWS SDK and Dependencies](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html)

> * npm install aws-sdk
> * npm install uuid


Interested developers will need to have a free Amazon AWS account, AWS required access ids and keys, and will need to prepare their Node.js AWS credentials information per:

> [Using AWS SDK Credentials in JS](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html)

Additional information (or perhaps just the modified Dockerfile) will come when the integration is available.