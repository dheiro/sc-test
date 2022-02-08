# Express + MongoDB Rest Api CRUD
This is Rest API CRUD build for technical/coding test at SejutaCita.

## Documentation & Test
The documentation and test can be access from http://BASE_URL/documentation

## How to Deploy with Kubernetes
- create **mongodb-secret** with `kubectl apply -f mongodb-secret.yaml`
- create **mongodb-deployment** and **mongodb-service** with `kubectl apply -f mongodb-deployment.yaml`
- create **mongodb-configmap** with `kubectl apply -f mongodb-configmap.yaml`
- create **express-app-deployment** and **express-app-service** with `kubectl apply -f express-app-deployment.yaml`
- access api from http://BASE_URL/api

## Tech
- NodeJS
- ExpressJS
- MongoDB
- Kubernetes

## Running Proof
- Service running
    ![](https://i.postimg.cc/MTqyg84Q/Screen-Shot-2022-02-08-at-18-37-38.png)
- Test Documentation endpoint in running api server
    ![](https://i.postimg.cc/yxzYLVrM/Screen-Shot-2022-02-08-at-18-37-42.png)
- kubectl panel
    ![](https://i.postimg.cc/c4LN0gYD/Screen-Shot-2022-02-08-at-18-38-37.png)

## Demo
**Access http://BASE_URL/api/init to create initial users (one time only)**
- Admin: admin:admin123
- User: user:user123

## Flow Diagram
![](https://i.postimg.cc/gJVcxxYx/Untitled-Diagram-1.jpg)
![](https://i.postimg.cc/sxKVJbGy/Untitled-Diagram-2.jpg)
