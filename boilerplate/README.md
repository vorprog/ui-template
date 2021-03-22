```
docker run --detach \
--env NODE_LISTENER_PORT='8080' \
--env GITHUB_USERNAME='richardsnider' \
--publish 8080:8080 \
--name ui-boilerplate ui-boilerplate
```