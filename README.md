# dtk-graph-example1-app

This is an example nodejs app which is used to demonstrate communication with Redis DB.
Pre-requisite: 
- Deployed Redis DB from the repo: https://github.com/dtk/dtk-graph-example1-helm in following way: 
```
cd redis
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install my-release bitnami/redis --values values.yaml
```
- Take Redis DB password from the output of Helm chart execution
```
export REDIS_PASSWORD=$(kubectl get secret --namespace default my-release-redis -o jsonpath="{.data.redis-password}" | base64 --decode)
```

## Deploy with Docker

To deploy node app with docker, do following:
```
docker build -t getdtk/graph-example1-app .
docker run --env PORT=8080 --env DB_HOST=<REDIS_HOST> --env DB_PORT=<REDIS_PORT> --env DB_PASSWORD=<REDIS_PASSWORD> -p 8080:8080 getdtk/graph-example1-app
```

To verify that deployment is succesfull, check inline logs:
```
> dtk-graph-example1-app@1.0.0 start /usr/src/app
> babel-node app.js

Connecting to the database...
Starting express app...
Initiating middlewares...
Initiating routes...
Listening on port 8080
```

## Deploy with docker-compose

To deploy node app with docker-compose, first populate REDIS_HOST, REDIS_PORT and REDIS_PASSWORD values in docker-compose.yml and then do following:
```
docker-compose up -d
Creating network "dtk-graph-example1-app_default" with the default driver
Creating app ... done
```

To verify that deployment is succesfull, check docker container logs:
```
docker ps -a | grep graph
2d75df6ea0d7        getdtk/graph-example1-app               "npm start"              4 seconds ago       Up 2 seconds                    0.0.0.0:8081->8080/tcp
```

```
docker logs -f 2d75df6ea0d7

> dtk-graph-example1-app@1.0.0 start /usr/src/app
> babel-node app.js

Connecting to the database...
Starting express app...
Initiating middlewares...
Initiating routes...
Listening on port 8080
```

## Deploy with Kubernetes

To deploy with kubernetes, you first need to generate base64 content for REDIS_PASSWORD:
```
echo -n $REDIS_PASSWORD | base64
```
and paste that value into the `app-secret.yaml` file.

Next, open `app-dep-svc.yaml` and add value for the <DB_HOST> (REDIS HOST). You can find it in following way:
```
kubectl get svc | grep redis-master
my-release-redis-master                      NodePort       172.20.78.144    <none>                                                                   6379:31111/TCP               4h50m
```
where `DB_HOST=my-release-redis-master`

After this, run following commands:
```
kubectl apply -f kubernetes/app-secret.yaml
kubectl apply -f kubernetes/app-dep-svc.yaml
```

To verify that deployment is succesfull, check pod logs:
```
kubectl get pods | grep node-app-dep
node-app-dep-6f5bf94995-s52q8                                 1/1     Running     0          24m

kubectl logs -f node-app-dep-6f5bf94995-s52q8
> dtk-graph-example1-app@1.0.0 start /usr/src/app
> babel-node app.js

Connecting to the database...
Starting express app...
Initiating middlewares...
Initiating routes...
Listening on port 8080
```

## Use app

App supports two endpoints:
- POST /api/redis - Create new value in redis for key foo
```
curl -X POST -H "Content-Type: application/json" -d '{"value": "mynewvalue"}' http://APP_HOST:APP_PORT/api/redis
{"status":"Success","message":"Successfully set foo variable to value mynewvalue"}
```
- GET /api/redis - Get created value from redis for key foo
```
curl -X GET http://APP_HOST:APP_PORT/api/redis
```
