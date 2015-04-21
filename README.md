Sead RESTful API
=============

> This is the RESTful API powering Sead. The most recent stable version is deployed to api.sead.io, while the most recent passing commit is deployed to staging-api.sead.io.


## Current State / Progress


[ ![Codeship Status for JoinSead/API](https://codeship.com/projects/bb3c40b0-9ece-0132-bcf3-56e0c71a690d/status?branch=master)](https://codeship.com/projects/64958)

![Progress](http://progressed.io/bar/15)  
*If the progress-bar above is anything less than 100%, or if the build is failing, be wary of using this repo*.


## Install the API

```
git clone --recursive git@github.com:JoinSead/API.git sead_api && cd sead_api && npm install
```

## Configure the API
``` 
vi lib/config.js
```
The /lib/config.js file contains the vast majority of the  configuration parameters. By editing that file you adjust settings for: 

* MongoDB
* Redis
* RabbitMQ
* AWS
* Mailgun
* Stripe

As well other services and key settings such as the site name, the default url, the client-keys, and many others.

The file is separated into an environment-based switch (to separate the settings for localhost, lan, staging, and production environments). The localhost settings should get you up and running locally, assuming you're running mongo, redis and rabbitmq services on your localhost as well.

### Optional: Import your private key
The Sead private key is not part of this repository by default. It is used **only** on the production and staging servers. (To decrypt sensitive strings needed within the "production" and "staging" parts of the config.js file). It is **not** necessary for a successful localhost deployment. 

If you have access to the private key, add it (as privkey.pem) to the devops/keys directory before deploying to the staging or production servers.

The private key should used be ignored by git. But always double check to be sure before commiting. Run a command like below:

```
git ls-files --others --exclude-standard
```

Then review the output to make sure that your private key is not being tracked by git. Your private key should **not** be listed when you run that command. If it **is** listed, that's a problem. Review the instructions above and make sure you've named it correctly and placed it in the correct directory. Do not commit or push if your private key is being added to the repository.

### Sidenote: Encrypting and decrypting sensitive strings

To encrypt a sensitive string (with the public key), save the string in a standalone file, and then run a command like this one:

```
gulp encrypt --in 'devops/unencrypted_files/input.txt' --out 'devops/encrypted_files/output.txt' 
```
To decrypt a string and use them during code execution, follow the examples in the config.js file (under the production and staging switches). You will need to import the private key (see above) in order to decrypt.



## Run the tests

``` 
npm start && npm test && npm stop
```

If any tests fail, review the relevant files. The most likely cause of failures is a failed connection to Mongo, Redis, Neo4j, DynamoDB, or RabbitMQ (in which case you should check your settings and make sure those applications are running and available). If any other issues present themselves, please report them (see below). 

### *Tip*
You can see more verbose output from the failed integration tests by editing lib/config.js and changing config.log to *true*.


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
There is a wiki attached the Github repo. This wiki explains the basics of connecting to the API, and overviews all the associated services. You can access the Wiki [here](https://github.com/JoinSead/API/wiki). 

You can also consume the API by deploying the Sead web or mobile clients, available here:

* [https://github.com/JoinSead/web-client](https://github.com/JoinSead/web-client)
* [https://github.com/JoinSead/mobile-client](https://github.com/JoinSead/mobile-client)


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

Nodemon has been incorporated into Gulp to ease the development process. To activate Nodemon run:

```
gulp watch
```
This way, the test-suite will be re-run automatically after every change is made. 

If you have fixed a bug, or added a feature please feel free to [submit a pull request](https://help.github.com/articles/using-pull-requests). If you've added a feature please make sure your code is tested in some way (unit, component, integration, whatever). We're striving for 100% coverage via integration tests, 90% coverage via component tests, and 80% coverage via unit tests. You don't have to write all these tests yourself, but please do a significant amount.

## Report Bugs / Request features
Found a bug? Please report it in the [issues tab](https://github.com/JoinSead/API/issues/new).

If there's a new feature you want you can either:

* Create an issue (see above) and label it accordingly
* Send an email to a@sead.io
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

