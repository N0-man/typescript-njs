# When typescript meets NGINX 🧨

> This is what happens with NGINX when you have more sophisticated requirements before routing or load balancing e.g. simple bot protection, cookie validation, header based custom routing etc

![](https://media.giphy.com/media/CObaaVoCUZyiqCNKoG/giphy.gif)

<a href="https://media.giphy.com/media/CObaaVoCUZyiqCNKoG/giphy.gif">via GIPHY</a>

Then there came [NGINX Javascript module](https://www.nginx.com/blog/harnessing-power-convenience-of-javascript-for-each-request-with-nginx-javascript-module/) which brought the power of javascript to NGINX. [Here](https://nginx.org/en/docs/njs/index.html) is a quick guide on setting up njs in NGINX.

## Motivation
NJS undestand javascript in ES5. This project contains the boilerplate that allows using Typescript and any node library which is then transpiled into ES5 Javascript for NJS to understand.

## Installation

1. Build docker image:

```bash
docker build -t typescript-njs .
```

2. Run nginx docker container:

```bash
docker run -d -p 8080:80 --name typescript-njs typescript-njs
```
you should be able to see the application running on [http://localhost:8080](http://localhost:8080).

