# JS Walldecor

## Nextgen integration inside OldGen

Nextgen modules are added in modules folder via Cox, then built one by one with grunt task and united in one output css and js in /dist/externals folder. Output files are embeded in index.html and after that can be initialized in PrepareViewCommand
```
.
+-- dist
|   +-- externals
|       +-- nextgen.min.js
|       +-- nextgen.min.css
+-- modules
|   +-- header
|   +-- notification area
|   +-- ...
+-- resources
|   +-- index-dev.html
|   +-- index-prod.html
+-- src
|   +--
|     +-- controller
|       +-- startup
|         +-- PrepareViewCommand.js
+-- package.json
 ``` 

* [How to add nextgen module](#add)
* [How to update all nextgen modules](#update)
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
### <a name="update"></a>How to update all nextgen modules

```
cox checkout <branch>
cox pull <branch>
cox install 
```
This will install modules and there dependencies, described in 'dependencies' in package.json

### <a name="build"></a> How to build nextgen modules

run build task for dev environment 

```
grunt dev
```

run build task for prod environment
```
grunt prodTest
```

Build tasks include 'build-external-modules' task, so no extra steps should be done 



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

