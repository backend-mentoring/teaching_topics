# Deploying to AWS with Docker

Now that we have our application built with a frontend and all, it is finally time to deploy our application to a instance in our cloud provider of choice: AWS.

## Getting Started

Setup an AWS account / Amazon account. Using a new credit card and email will give you access to free tier services offered by AWS. This includes the t1.micro instance that we will be using in this lesson. (More on instance types later)

Once you've created your account, login and let's take a peak around. It is important to note that we are currently logged into AWS with our ROOT CREDENTIALS. Why is this important? Because it is dangerous. Whether dealing with a server or your AWS account, root users should be avoided due to the fact that they have open permissions for all resources and actions.

#### Some AWS Best Practices

Let's start by using a service called **IAM**. This service allows us to make users for our account, and associate users to permissions so that they do not operate beyond their purpose. For our purpose we need a user that can spin up a server in **EC2**.

To create a new profile/user:

1. Click **Services** in the top left hand corner of the AWS Management Console to drop down the list of services
2. Under **Security, Identity & Compliance** click **IAM**
3. In the left sidebar, click **Users**
4. Enter a **User Name** and select **Programmatic Access** as the Access Type and click **Next**
5. Select **Attach Existing Policies Directly** and search for then select **AmazonEC2FullAccess**, then click **Next**
6. Review and **Create User**

Now we have a new user specific to our docker deployment. This user cannot mess with other services outside of EC2 and we have therefore decreased our risk and exposure to someone with malicious intent.

Let's grab the **Access key ID** and **Secret access key**, or simply download the .csv for our own records.



## Creating our Docker Machine

Now that we have our credentials ready to go, we can use docker-machine to create a new machine remotely using the AWS driver. Documentation is here:

https://docs.docker.com/machine/drivers/aws/

This driver comes with extra options to specify our credentials and what kind of machine in AWS we want to spin up. We will be using the free tier instance type **t2.micro** for our docker-machine deployment. Also we will choose to deploy in region **us-west-2**, since this is the recommended region by AWS due to it being the newest and least trafficked.

Spinning up our remote docker-machine requires only one command with the following options.

```shell
docker-machine create --driver amazonec2 \
	--amazonec2-access-key AKI******* \
	--amazonec2-secret-key 8T93C******* \
	--amazonec2-region us-west-2 \
	--amazonec2-instance-type t2.micro \ #free tier, also the default
	todos-service
```

This may take a few minutes as AWS launches the instance and docker-machine installs docker on the instance.

If we look in our management console we can follow along the process. If all went well, we now have a running docker-machine in AWS.

### Security Groups

Every EC2 instance that you create will be assigned a security group to manage inbound and outbound traffic. With docker-machine managing the creation, it also created and assigned the docker-machine security group to our instance.

This instance has two inbound ports open to the world, SSH (22) and Docker Machine TCP Rule (2376). 

#### SSH

The first allows us to SSH into our instance as with any other machine. We can do this using following command.

```shell
docker-machine ssh todos-service
```

Inside we can see the machine as the ubuntu user. We can verify docker is running. First we have to add the ubuntu user to the docker group to give permission to connect to the docker daemon.

```shell
sudo usermod -aG docker ubuntu
```

Now we have to exit and reconnect to verify our ubuntu user can see docker processes. Run **exit** and SSH back in.

```shell
docker ps
```

#### Docker Machine

To connect with docker-machine and deploy our containers remotely we will use the following command.

```shell
eval $(docker-machine env todos-service)
```

This configures our shell to use the todos-service to listen for docker processes. **Note**: You must always do this when running a new shell/terminal tab. If you don't see your processes, try running this command again to reconfigure.

#### Creating a Security Group

We want to keep these two inbound ports, however we may need a few more for this service. We will create a new security group for this todos-service.

1. From the **EC2 Dashboard**, click on **Security Groups** in the left sidebar under **Network & Security**.
2. Click **Create Security Group**.
3. Give it a **name**, **description**, leave the default **VPC**
4. Add Rules and Create
   1. **Type:** SSH, **Source:** Anywhere
   2. **Type:** Custom, **Port Range:** 2376, **Source:** Anywhere
   3. **Type:** Custom, **Port Range:** 3000, **Source:** Anywhere

The third rule will allow us to connect to our application from the outside once deployed. 

Now go back to the list of EC2 instances and select the todos-service, dropdown **Actions > Networking > Change Security Groups**. Select the newly created group and click **Assign Security Groups**.

As you might notice, you can attach to multiple security groups so that permissions don't have to be repeated. I have created a new security group so that in the future when I need to spin up more of these services, I can do so from the command line by specifying the `--amazonec2-security-group` option.



## Deploying to Docker Machine in AWS

With everything set up on the AWS side, it will be relatively simple for us to deploy our Todos API to our docker machine. Just in case you haven't configured your shell for this machine, let's run it again.

```shell
eval $(docker-machine env todos-service)
```

From the project root of our todos app, we can run the same command we do locally to bring up our system remotely.

```shell
docker-compose up
```

Our API service has port 3000 mapped to the docker-machine's port 3000. Since we opened up that port using our new security group, we should be able to access our api. In the **EC2 Dashboard**, select our instance and copy the **Public IP**. In our browser, we can connect.

`http://[Public IP]:3000/todos`

And we are fully deployed.