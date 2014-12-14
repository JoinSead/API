Litaria RESTful API
=============

> This is the RESTful API powering Litaria. The most recent stable version is deployed to api.litaria.com, while the most recent nightly build is deployed to api-staging.litaria.com.

## Current State / Progress
![build](https://travis-ci.org/Litaria/API.svg?branch=master)
![Progress](http://progressed.io/bar/1)  
*If the progress-bar above is anything less than 100%, or if the build is failing, be wary of using this repo*.


## Install the API

```
git clone --recursive git@github.com:Litaria/API.git litaria_api && cd litaria_api && npm install
```

## Configure the API
``` 
vi lib/config.js
```
* Edit the rate-limit settings
* Edit the allowable-client-id settings
* Edit the environment-specific settings for any environments you plan on deploying to (incuding localhost)
  * Edit the base url for the API
  * Edit the mongoDB connection settings
  * Edit the Neo4j connection settings
  * Edit the DynamoDB connection settings
  * Edit the Redis connection settings
  * Edit the RabbitMQ connection settings


## Run the tests

``` 
npm start && npm test && npm stop
```

If any tests fail, review the relevant files. The most likely cause of failures is a failed connection to Mongo, Redis, Neo4j, DynamoDB, or RabbitMQ (in which case you should check your settings and make sure those applications are running and available). If any other issues present themselves, please report them (see below). 

### *Tip*
You can see more vebose output from the failed integration tests by editing app.js and changing api.config.log to *true*.


## Deploy the API
### localhost example:
```
npm start
```

### CENTOS example (VM over SSH)

```
screen
cd {path-to-your-installation}
NODE_ENV=production node ./bin/www
[ctrl a d]
```
Note that the environment has been passed so that the application will run in production mode.


## Consume the API
There is a wiki attached the Github repo. This wiki explains the basics of connecting to the API, and overviews all the associated services. You can access the Wiki [here](https://github.com/litaria/API/wiki). 

You can also consume the API by deploying a the Litaria web or mobile clients, available here:

* [https://github.com/litaria/web-client](https://github.com/litaria/web-client)
* [https://github.com/litaria/mobile-client](https://github.com/litaria/mobile-client)


## Stop the API
### localhost example:
```
npm stop
```

### CENTOS example (VM over SSH)

```
screen -r
[ctrl c]
[ctrl a d]
```

## Contribute
Fixed a bug? Added a feature? Feel free to [submit a pull request](https://help.github.com/articles/using-pull-requests). If you've added a feature please make sure your code is tested in some way (unit, component, integration, whatever). We're striving for 100% coverage via integration tests, 90% coverage via component tests, and 80% coverage via unit tests. You don't have to write all these tests yourself, but please do a significant amount.

## Report Bugs / Request features
Found a bug? Please report it in the [issues tab](https://github.com/Litaria/API/issues/new).

If there's a new feature you want you can either:

* Create an issue (see above) and label it accordingly
* Send an email to austin@litaria.com
* Starting building it yourself (see contribution-guidelines below).

## License

GNU Public License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

