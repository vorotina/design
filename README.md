# JS Walldecor

## Nextgen integration 

Nextgen modules are installed via Cox and contained in /modules folder 
Nextgen modules are built one by one with grunt task and united in one output css and js in /dist/externals folder
Output files are embeded in /resources/index.html

```
.
+-- dist
|   +-- externals
|       +-- nextgen.min.js
|       +-- nextgen.min.css
+-- modules
|   +-- header
|   +-- notification-area
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

* [Add nextgen module](#add)
* [Build nextgen modules](#build)
* [Update all nextgen modules](#update)

### <a name="add"></a>Add nextgen module

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

#### Upload module using Cox
```
cox install 
```
Cox will also install all 'dependencies' from module's package.json insile the module (not 'devDependencies')

#### Init module in PrepareViewCommand
```
window[ "nextGenHeader" ][ "init" ]();
```

### <a name="build"></a> Build nextgen modules

run build task for dev environment 

```
grunt dev
```

run build task for prod environment
```
grunt prodTest
```

All nextgen modules will be built, no extra steps should be done 

### <a name="update"></a>Update all nextgen modules

```
cox checkout <branch>
cox pull 
cox install 
```
This will install all modules and theirs dependencies


