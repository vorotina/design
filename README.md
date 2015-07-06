# JS Walldecor

## Include nextgen moduels

### add nextgen modules as a Cox dependencies
```
"coxDependencies": {
  "header": "git@github.com:albumprinter/oet-header.git",
  "notification-area": "git@github.com:albumprinter/oet-notification-area.git",
}
```

### add them as externalModules
in grunt file /config/globals.js

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

### exclude them from CORE modules

/config/globals.js

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

### Include nextgen output files in index.html

/resources/index.html

```
<link rel="stylesheet" type="text/css" href="./nextgen/nextgen.css" />
<script type="text/javascript" src="./nextgen/nextgen.js"></script>
```

### Build nextgen modules

Gruntfile.js  

```
grunt.registerTask('build-external-modules', 'Applying external modules', function () {
    // clean the folder
    grunt.task.run('clean:nextgen');
    // complile templates
    grunt.task.run('compile-views:nextgen');
    // copy images
    grunt.task.run('copy:nextgen');
    // concatenate and minify js
    grunt.task.run('browserify:nextgen');
    grunt.task.run('uglify:nextgen');
    // concatenate and minify css
    grunt.task.run('write-css-dependencies:nextgen'); //
    grunt.task.run('sass-nextgen-all');
    grunt.task.run('cssmin:nextgen');
});
```

### initialize the external modules
```
window[ "nextGenHeader" ][ "init" ]();
```


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

