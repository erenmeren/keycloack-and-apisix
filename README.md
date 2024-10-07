# apisix-keycloak-docker-compose

* !!!  Don't foget fuckink permissions
```sh
  sudo chmod -R 777 apisix-keycloak-docker-compose-main
```

* Run docker-compose 
```sh
  $ docker-compose -p docker-apisix up
```

* APISIX Dashboard URL:
http://localhost:9000/

* Keycloak URL:
http://localhost:8080/

* bacnkd
https://httpbin.org/get

## create client and user in keycloack
client secret : EzmC8i1KyDHAYIvbNpq5q2feq912sM6q
client id : reynolds-client

## create upstream
```curl
curl -i -X PUT http://localhost:9180/apisix/admin/upstreams/1 \
    -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "httpbin_upstream",
        "type": "roundrobin",
        "nodes": {
            "httpbin.org:443": 1
        },
        "scheme": "https"
    }'

```


## create route

```curl
  curl -i -X PUT http://localhost:9180/apisix/admin/routes/1 \
    -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "httpbin_route",
        "uri": "/httpbin",
        "methods": ["GET"],
        "upstream_id": "534831714661302981",
        "plugins": {
            "proxy-rewrite": {
                "uri": "/get"
            }
        },
        "status": 1
    }'

```