# Work in progress...

# Deploy the project to a kubernetes cluster

- connect to cluster

## persistent volumes

```bash
kubectl apply -f k8s/db/mongodb-pvc.yml
```

## configmaps

### create fastapi configmap

```bash
kubectl create configmap for-production --from-literal=NODE_ENV=production
kubectl create configmap production-port --from-literal=PORT=<*put port number here*>
kubectl create configmap react-app-api-url –from-file=REACT_APP_API_URL=API_URL.txt


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
kubectl apply -f k8s/ingress/ingress-service-ssl.yml

```

## secrets

- mongodb secret

```bash
kubectl create secret generic mongodb-user --from-literal=MONGODBUSER=<*put user name here*> --from-literal=MONGODBPASSWORD=<*put password here*>
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
