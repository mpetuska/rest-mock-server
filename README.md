[![Gitpod ready-to-code](https://img.shields.io/badge/gitpod-ready--to--code-blue?logo=gitpod&style=flat-square)](https://gitpod.io/#https://github.com/mpetuska/rest-mock-server)
[![Docker_pulls](https://img.shields.io/docker/pulls/mpetuska/rest-mock-server?logo=docker&style=flat-square)](https://hub.docker.com/r/mpetuska/rest-mock-server)
# rest-mock-server
Remotely configurable mock REST API server

## Routing
### Config
There's a set of *special* endpoints that allows you to remotely manage the mocks. 
They're all available as a [Postman Collection](rest-mock-server.postman_collection.json) as well

#### Register a mock response
```http request
POST http://localhost:8080/config/{{actualRequestPath}}
Content-Type: application/json

{
  "static": false,
  "handler": "(req, res) => res.sendStatus(403)",
  "response": {
    "status": 203,
    "body": null
  }
}
###
```

Body schema with their default values is as follows:
```typescript
const config: RequestMock = {
  static: false, // If set to true will make this mock static, ignoring all other mocks and not expiring it until explicitly cleared.
  handler: null, // Free form js lambda function based on ExpressJS request handler in the form of `(req: Request, res: Response): void => {}`.
  response: null // Less flexible but simpler alternative to handler, returns given `response.body` under `response.status` code.
}
```

#### List all registered mock responses for a given path
```http request
GET http://localhost:8080/config/{{actualRequestPath}}
###
```

#### Clear all registered mock responses for a given path
```http request
DELETE http://localhost:8080/clear/{{actualRequestPath}}
###
```

#### Clear all registered mock responses (complete reset of the service)
```http request
DELETE http://localhost:8080/clear
###
```

### Consume
When the service gets a request that's not under `/config/*` or `/clear/*` paths, it defaults to consumer mode and serves
registered requests by path (or return 404 if none were registered under given path). Note that unless you use static registration,
each registered response will be consumed as part of the mock request. Non-static registered responses are consumed on first in, first out basis.

## Docker
The service is also published as docker image, so you can run it with the bellow one-liner:
```bash
docker run -p 7000:7000 mpetuska/rest-mock-server
```

