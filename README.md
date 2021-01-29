# Simple Mock API Server

built with [<img src="https://deno.land/logo.svg" width="24"> __Deno__](https://deno.land/)

## Getting Started

To run this app
```
$ docker-compose up
```

### Usage

The core of this simple mock API is `routes.json` and `data` directory.

`routes.json` uses this format:

```
[
  {
    "endpoint": STRING,
    "method": STRING("get"|"post"|"put"|"patch"|"delete"),
    "collections": [
      {
        "request": {
          "type": STRING("json"|"form-data"|"text"),
          "access_token": STRING,
          "body": OBJECT,
          "params": OBJECT
        },
        "response": {
          "status": NUMBER,
          "body": STRING(PATH TO DATA)
        }
      }
    ]
  }
]
```

`data` directory contains all the json files for response.
