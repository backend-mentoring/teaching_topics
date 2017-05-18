## Deploying with Docker

#### What is docker?

Docker is a software container platform that allows you to run apps side by side. Containers do not run full OS, but instead run a minimal system with libraries and settings required to run your application. Think of containers has containing just enough to make it work.

![VM Architecture](https://www.docker.com/sites/default/files/VM%402x.png)

Docker gets flack for not being as fast as VMs, and many people question why switch to docker? The reason is resource efficiency. Docker machines unlike VMs, can run any docker container no matter which application it may be. VMs are set up specifically for one type of application and can be scaled per cluster of VMs.

#### Deployment?

Docker Toolbox contains tools to coordinate and configure the applications you wish to deploy.

| CLI Tool       | Responsibility                           |
| -------------- | ---------------------------------------- |
| docker         | building, running, stopping images and containers based on a configuration file called the Dockerfile |
| docker-compose | running and building applications together and make necessary connections, setting, envs |
| docker-machine | managing the docker machines (e.g. servers/vms running docker) remotely and locally |



#### Installation

Follow the setup instructions for your OS:

https://docs.docker.com/engine/installation/

Once you have installed the docker toolbox, you can run the following container to confirm everything is setup correctly.

```bash
docker run hello-world
```

Also, let's ensure we have all of the tools.

```shell
docker -v
docker-compose -v
docker-machine -v
```



#### Docker and the Dockerfile

The dockerfile is the main configuration file for the container that your app will run inside. Dockerfile commands include: 

| Command | Description                              |
| :------ | ---------------------------------------- |
| FROM    | command that pulls a base image from dockerhub or local images |
| RUN     | runs a shell command                     |
| ENV     | set an environment variable              |
| ADD     | add files to the container               |
| EXPOSE  | open a container port to allow connections from the outside |
| CMD     | set the command to execute when starting the container |

The FROM command is very important as it gives us a base image for building our container. Dockerhub is a great resource for finding a base container for just about every piece of software out there. Let's take a look:

https://hub.docker.com/explore/

Let's create the Dockerfile for our TODOS API. Dockerfiles are usually located in the root directory of the application they are containerizing. For our purposes, the dockerfile below is a sufficient start to get it running.

###### Dockerfile

```dockerfile
# set the base image, must be the first instruction in the file
FROM node:7-onbuild
# set our app root as an environment variable
ENV APP_HOME /app
# create the app root folder
RUN mkdir $APP_HOME
# add our package.json and install the dependencies
ADD package.json $APP_HOME
RUN npm install
# add the rest of our application files
ADD . $APP_HOME
# expose port 3000 so we can connect to our api
EXPOSE 3000
# set the default run command to start our app
CMD npm run start
```

Now that we have defined our container build config, lets go ahead and build it. Run the following command inside of the project root.

```shell
docker build -t todos_api:v1 .
```

**Note:** each command runs in succession creating layers in the build process. These layers will increase the efficiency of rebuilding your app when source code changes are made. Keep this in mind when structuring dockerfiles.

If the build was successful, we should see our newly created image in our list.

```shell
docker images
```

Now let's run our container.

```shell
docker run todos_api:v1
```

What happened?



##### Docker-Compose

Remember that mongod process thing that we needed to run our application? Well we still need it and we need to connect it to the container running our API.

This is where docker-compose comes in. With compose we can coordinate running containers and connect them together. The docker-compose configuration is a YAML file that will also live in the project root. 

###### docker-compose.yml

```yaml
api:
	build: .
	command: npm run start
	ports:
		- "3000:3000"
	links:
		- db:db
	environment:
		- MONGODB_URI=mongodb://db:27017/TodoApp # replaced localhost with db as per link
db:
	image: mongo:3.0.2
```



With one command we can create and start both containers in sync and connected.

```shell
docker-compose up
```

This works for the first run. If we make changes to our source code and want to rebuild the image, then we need to call the build command first.

```shell
docker-compose build
```