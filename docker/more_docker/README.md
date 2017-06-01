# More Docker

### docker-machine

Let's setup a proper docker machine locally. To do this we will use the **docker-machine create** command to spin up a new docker host for our containers.

Before we create, we need to checkout the documentation: https://docs.docker.com/machine/reference/create/

As we can see, a **driver** is necessary to create a docker machine. The driver will be determined by the provider available to us on our machine or the remote provider we would like to utilize (e.g. AWS). Let's take a look at the list of drivers supported by docker machine: https://docs.docker.com/machine/drivers/

For our purposes we will be using `virtualbox` (Mac/Linux) and `hyperv` (Windows) drivers, depending on the operating system you are using.

Let's create a machine for deploying our staging environment.

```bash
docker-machine create --driver virtualbox staging
```

**OR**

```shell
docker-machine create --driver hyperv staging
```

We will see our machine start up and get assigned an IP. The assigned IP will be our app's IP for us to access. To get the IP of a specific machine we can use the **ip** command.

```shell
docker-machine ip staging
```

Alternatively we list all of our machines and their IPs using the list command

```shell
docker-machine ls
```

Now we have the power to spin up multiple machines!!

##### Switching between machines

We have our machine and we want to start deploying our application on this machine. Let's first check out the environment running on the machine we just created using the **env** command

```shell
docker-machine env staging
```

What does it return? Anything interesting there?

At the bottom of the output, we see two comment lines. The env command is showing us how to configure our shell to use the machine we just created. It looks like a strange command, but we will be using this a lot when deploying to different machines.

Let's go ahead and configure our shell for our staging machine.

```shell
eval $(docker-machine env staging)
```

Our shell is now connected to our brand new docker-machine.

Let's list our docker images to ensure this is the fresh machine we just created.

```shell
docker images
```

We should see no images listed!



### docker-compose

With our fresh machine in hand, it is time to refine our compose file to sort out some of the issues faced last time. As always let's start by checking out some documentation.

https://docs.docker.com/compose/compose-file/compose-file-v2/

First thing we notice is the **version**. As docker devs continue to refine the compose process, new configurations are released to make deployment even easier.

Let's add the latest version definition to our docker-compose file.

###### docker-compose.yml

```yaml
version: '2'
services:
  api:
    build: .
    command: npm run start
    ports: 
      - "3000:3000"
    links:
      - db:db
  db:
    image: mongo:3.0.2
```

We now define our db and api under the services key. This is a much better and more explicit definition of our staging environment.

Next we are going to take a look at a few other service configuration options.

#### restart

This option let's us define how/if a service should restart under certain conditions. To solve the problem of failed db connections, when the database is not available, we will define a restart policy to always restart if stopped or exited due to an error.

```yaml
services:
  api:
    ...
    restart_policy: always
```

#### depends_on

This option defines if a service relies on another service to start before it can start itself. Since our app requires the db to start up, let's define our depends on.

```yaml
services:
  api:
    ...
    depends_on:
      - db
```

Time to spin up our system.

```shell
docker-compose up
```

Now we can access our app at the IP we listed earlier.

We can use postman to make a post request to create a todo in our staging environment.

What will happen when we stop our docker containers and restart??



#### Volumes

There is a problem with our db service. Everytime we deploy a new version of our application, the database loses all of the data we had before. In staging, we may have sample data that we want to persist across deployments. This is where volumes come into play. With volumes we can define directories that are linked from the host to the docker container. Since our host will continue running even when containers are down, we can persist the data there by linking. Let's refine our db service.

```yaml
services:
  db:
    image: mongo:3.0.2
    command: mongod -dbpath /data/db --smallfiles
    volumes:
      - /data/db:/data/db
```

We have defined our own start up command so that we can use the —smallfiles option for staging environment, otherwise mongo requires a large amount of space on our virtualbox, which we do not have.

In the volumes definition we define it by first giving our host directory, then followed by the container directory. **data/db** is a standard location for these kinds of files so we are going to attach the host data/db as a volume to the container.

Now when we start our app we can create a new todos, shut down and remove our containers, and restart them, and the data is still there.



##### Replication and Replacement

The concept we explored above further exemplifies the ideas behind containers. Containers are meant to be **replaced** and redeployed when new versions of the app become available. By removing the data file from the database process or application, we are removing the concern of persisting data to another source.

In addition, when we want to **replicate** the application and scale horizontally, we require this sort of separation in order for our mongo service to serve up the same data across all containers. Without this separation you would never know what data you are accessing when connecting to the most available mongo service.