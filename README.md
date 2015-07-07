# JS Walldecor

## Nextgen integration inside OldGen

* [How to add nextgen module](#add)
* [How to build nextgen modules](#build)

### <a name="add"></a>How to add nextgen module

#### add module in package.json as a Cox dependency

```
"coxDependencies": {
  "header": "git@github.com:albumprinter/oet-header.git",
  "notification-area": "git@github.com:albumprinter/oet-notification-area.git",
  ...
}
```

#### include module in grunt config  

in file /config/globals.js


```
externalModules : [
    {
        input: "./modules/header/src",
        bootstrap: "./modules/header/src/header-module/index.js"
    },
    {
        input: "./modules/notification-area/src",
        bootstrap: "./modules/notification-area/src/notification-area/notification-area.controller.js"
    }
]
```

exclude it from CORE modules

```
{
    isCore  : true,
    input   : [
        "modules!(node_modules)/**/src",
        "dist/build/templates",
        "node_modules/oet-puremvc-module"
    ],
    exclude: [
        "modules/header/src",
        "modules/notification-area/src"
    ],
    output  : "dist/build/modules/module-core.js"
}
```

#### Init module in PrepareViewCommand
```
window[ "nextGenHeader" ][ "init" ]();
```


### <a name="build"></a> How to build nextgen modules

run build task for dev environment 

```
grunt dev
```

run build task for prod environment
```
grunt prodTest
```

Build tasks include 'build-external-modules' task, no extra step should be done to build nextgen modules



## Setup local environment

### Required Tools:
Build Server requirements:
* NodeJS
* NPM
* cox
* Grunt
* Testem
* GIT
* SVN
* Java
* Ruby runtime
* SASS

### Required Setup:
* Make sure you have a local ssh key
([https://help.github.com/articles/generating-ssh-keys]())

* Install Ruby

**Debian / Ubuntu**:
```
sudo apt-get install ruby
```

 **OS X**: brew

**Windows**
Download the installer: [http://rubyinstaller.org/downloads/]()

* Install SASS

```
gem install sass
```
* Install global npm modules

```
npm install -g grunt-cli
npm install -g testem
npm install -g cox
```

### Clone the repository in a local directory

```
git clone git@github.com:albumprinter/oet-js-walldecor.git
cd oet-js-walldecor
```

### Setup the local environment:

```
// install dependencies
// in case of a fetch error on Git repositories, try either:
// npm install npm@latest
// or: npm config set strict-ssl false

cox install

// Build it
grunt build

// Start local web server (with external services)
grunt dev

// Start local web server (with mocked services)
grunt devStub

// Running tests in JSUnit:
grunt test

// Running new Mocha tests with Testem
testem

```

