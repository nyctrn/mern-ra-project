## Retirement application project
This is a MERN stack project that uses JWT for authorization and ContextAPI for state management.
The project was deployed to a Kubernetes cluster, but a version of the application can be found on [Heroku](#application-url--test-accounts).


# How to run application locally

In order to run the application locally, you will need:

- NodeJs (+ npm)
- Mongodb connection string (either from MongoDB Atlas or from local deployment)
	- For fast and easy testing you can download mongodb docker image and run the container
	
	```bash
	docker pull mongo
	docker run -d  --name mongo-docker  -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=<*put a username here*> -e MONGO_INITDB_ROOT_PASSWORD=<*put a passowrd here*> mongo

	```

	- Then create the connection string likes this: 
	```	
	mongodb://<*username*>:<*password*>@localhost:27017/?authSource=admin
	```
	- Add this connection string into the api .env file

```bash
cd api
npm install
```

```bash
cd ui
npm install
```

- create .env file in api and ui folders and add:

for api:

- CONNECTION_STRING=<_put mongodb connection string here_>
- JWTSECRET=<_put a jwt secret here_>
- REGISTRATIONCODE=<_put registration code here_>

for ui:

- REACT_APP_API_URL=http://localhost:6050

- If you want the mailing system to work you will need mailhog service.
	- 1025 port is the default for the SMTP server, and 8025 for the HTTP server
	- To connect to the WebUI go to http://localhost:8025/
- A fast and easy way to run it locally is using docker like this:

```bash
docker pull mailhog/mailhog
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
```



- Finally, to start the application:

```bash
cd api
npm run dev
```

# Deploy the project to a kubernetes cluster

- Connect to the cluster

## persistent volume

```bash
kubectl apply -f k8s/db/mongodb-pvc.yml
```

## configmaps

```bash
kubectl create configmap for-production --from-literal=NODE_ENV=production
kubectl create configmap production-port --from-literal=PORT=<*put port number here*>
kubectl create configmap react-app-api-url --from-file=API_URL=API_URL.txt


```

## deployments

```bash
kubectl apply -f k8s/db/mongodb-deployment.yml
kubectl apply -f k8s/api/api-deployment.yml
kubectl apply -f k8s/ui/ui-deployment.yml
kubectl apply -f k8s/mailhog/mailhog-deployment.yml
```

## services

```bash
kubectl apply -f k8s/db/mongodb-service.yml
kubectl apply -f k8s/api/api-service.yml
kubectl apply -f k8s/ui/ui-service.yml
kubectl apply -f k8s/mailhog/mailhog-service.yml

```

## secrets

- mongodb secret

```bash
kubectl create secret generic mongodb-user --from-literal=MONGODBUSER=<*put username here*> --from-literal=MONGODBPASSWORD=<*put password here*>
```

- tls secret

```bash
cd nginx/certs
 kubectl create secret generic tls-secret --from-file=tls.crt=certificate.crt --from-file=tls.key=private.key --from-file=ca.crt=ca_bundle.crt
```

- api https secret

```bash
cd nginx/certs
 kubectl create secret generic api-https-secret --from-file=tls.crt=certificate.crt --from-file=tls.key=private.key
```

- jwt secret

```bash
 kubectl create secret generic jwt-secret --from-literal=JWTSECRET=<*put a jwt secret here*>
```

- registration code

```bash
 kubectl create secret generic registration-code --from-literal=REGISTRATIONCODE=<*put a registration code here*>
```

## ingress

- allow routing. Get the name of your network interface, e.g. eth0 and run

```bash
sudo ufw allow in on eth0 && sudo ufw allow out on eth0
sudo ufw default allow routed
```

- apply ingress yml file

```bash
kubectl apply -f k8s/ingress/ingress-service-ssl.yml
```

# docker registry

## create docker login secret

- create <AUTH> from the command

```bash
echo <USER>:<TOKEN> | base64
```

- create kubernetes secret

```bash
echo '{"auths":{"ghcr.io":{"auth":"<AUTH>"}}}' | kubectl create secret generic dockerconfigjson-github-com --type=kubernetes.io/dockerconfigjson --from-file=.dockerconfigjson=/dev/stdin
```

# Application URL & Test accounts

~~URL: https://marioskour.cloudns.cl/~~ (cluster temporary down)

A version of the app is deployed on Heroku: https://mern-ra.herokuapp.com/

## Employee test account:

	- email: gspan@gmail.com
	- password: g123456

Registration code for employees: jg9j#4*81n

## Citizen test accounts:

	- email: gereustath@otenet.gr
	- password: gerarimos1

	- email: fotthod@gmail.com
	- password: fot123


	

## 


# Application overview

![Alt text](img/app_overview.jpg?raw=true "Application overview")
