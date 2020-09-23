# ECOMMERCE VIDEOGAMES
## Install

- [Node](https://nodejs.org/dist/v10.12.0/node-v10.12.0-x64.msi) Version 10.12.0

The following 'npm global packages' **are optional** since all execution is handled by the npm scripts, and since these packages are dependencies declared in the package.json file it makes global installation unnecessary

> npm install -g typescript\
> npm install -g @angular/cli\
> npm install -g ts-node\
> npm install -g jasmine\
> npm install -g sass\
> npm install -g node-sass

- [NVM](https://github.com/creationix/nvm) (Node Version Manager)
- [Angular CLI](https://cli.angular.io/) version 6.2.5.

Once the project has been cloned, its dependencies must be installed running

```
npm install
o
npm i
```

## Development Process

Here the explanation of the following npm scripts

> npm start  

It will star the development server for the client application at the port 4200 from any client and open the index.html page with the default browser

> npm run docker:init:build  

It will star the development server for the client application with docker, with hot reloading.

> npm run styles

It will start the development for the creation of styles, this script creates tasks in **gulp** to compile and minify the **.sass** files in **css**, it is advisable to use this script with the script **docker:init:build**

> npm run build:universal

It will start the compilation in production mode, this compilation is optimized so that the application is able to be rendered from the server and be friendly with the seo.

### Git Hooks
As part of the development there are 2 rules to consider before pushing a commit to the git repo

* Our code shouldn't have any tslint warning or error.
* Our commit message should follow the same naming convention that the Angular project follows

In order to compliance those rules we are using 'husky' and  we have implemented the following git hooks as npm scripts

```
"husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "pre-commit": "npm run tslint",
      "pre-push": "npm run build:prod"
    }
  }
```

 - "commit-msg": We are using commitlint and @commitlint/config-conventional to compliance our policies for our commit messages. More details [here](COMMIT.md)

- "pre-commit": We are using gulp to run tslint rules before the commit got created. For this task, we are using gulp to run a customized verification
 - "pre-push": We use this hook before pushing our commist to the upstream git repo. In this case we are running tslint and building the app for production (```build:prod```), making sure that our code is compliance with Angular AOT rules.

### Stylelint

In order to enforce conventions styles we are usin [stylelint](https://stylelint.io/), [stylelint-scss](https://github.com/kristerkari/stylelint-scss) and [stylelint-config-standard](https://github.com/stylelint/stylelint-config-recommended). Those have been declared in the file [.stylelintrc.yml](.stylelintrc.yml)

```
  "extends": "stylelint-config-standard",
    "plugins": [
      "stylelint-scss"
    ],
    "rules":{
      ...
    }
```

Additionally, we have updated some rules that we needed for our application in the same file

```
  "rules": {
    "prefer-function-over-method": false,
    "no-null-keyword": false,
    "at-rule-empty-line-before": [
      "always", {
        "ignoreAtRules": [ "else" ]
      }
    ],
    "block-opening-brace-space-before": "always",
    "block-closing-brace-newline-after": [
      "always", {
        "ignoreAtRules": [ "if", "else" ]
      }
    ],
    "at-rule-name-space-after": "always",
    ...
  }
```

For this intent, we have implemented these npm scripts:

- "sass:lint": this task will call the gulp sass:lint:check task that will receive one parameter: maximun number of stylelint errors allowed before the task fails.

### Tslint

In order to enforce clean code practices we are using [codelyzer](http://codelyzer.com/), [angular-tslint-rules](https://www.npmjs.com/package/angular-tslint-rules#installation), and [tslint-consistent-codestyle](https://github.com/ajafff/tslint-consistent-codestyle#readme). Those have been declared in the file [tslint.json](tslint.json)

```
  "rulesDirectory": [
    "node_modules/codelyzer"
  ],
  "extends": ["angular-tslint-rules", "tslint-consistent-codestyle"],
  "rules": {
    ....
  }
```

Additionally, we have updated some rules that we needed for our application in the same file

```
  "rules": {
    "prefer-function-over-method": false,
    "no-null-keyword": false,
    "no-unused": [true, "ignore-parameters"],
    "directive-selector": [
      false,
      "attribute",
      "app",
      "camelCase"
    ],
    "component-selector": [
      false,
      "element",
      "app",
      "kebab-case"
    ],
    ...
  }
```

For this intent, we have implemented these npm scripts:

- "tslint": this task will call the gulp tslint task that will receive 2 parameters: maximun number of tslint errors allowed before the task fails and the number of errors shows at the execution of this task,

- "tslint:fix": this task was created in order to autofix the tslint errors that tslint can fix by itself. In this case we are telling to work with the client workspace.

- "tslint:report": this task will generate an HTML report with all the tslint errors that were found. This task is implemented as node component where the file will be created at "/reports/tslint-report.html". 

## Build

Run `npm run build` or `npm run build:prod` to build the project. The build artifacts will be stored in the `dist/client` directory.

The most critical part of the building process is creating code for production with AOT (Ahead-Of-Time) compiler.

For this phase of the SLCD we have implemented these npm scripts

- "build:prod" : this task will use AOT compilation in all its sense.

- "build:dev": this task will compile the code with AOT but it will also attach the source map of the code to the process. Why? To allow debug the Typescript if needed when the code is compile with AOT. To enable this part we are using the attribute "sourceMap" of the angular.json file for the client project.

```
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "apps/client/src/environments/environment.ts",
                  "with": "apps/client/src/environments/environment.prod.ts"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,                   .... here is disabled for PROD
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true
            },
            "dev": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": true,                   .... here is enabled for DEV
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true
            }
          }
        },
        "serve": {
```

It is recalled that we are using this last npm script as part of the bitbucket-pipelines.yml in the execution of the pipeline after every PR got merged in the develop branch.


## Code scaffolding

Ejecutar `ng generate component [component-name] --project [project-name]` para generar un nuevo componente. tambien puede utilizar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

> ng generate componente my-component --project client

## Arquitectura de la Solución

### Especificación de la arquitectura

Definición de cada espacio en la arquitectura de la solución para los proyectos

* Styles: Carpeta de estilos de la aplicacion en scss.
* Src
  * Core: Estilos, componentes unicos para la app.
    * Common
    * Lib
      * _Components_: Componentes comunes en todas lasaplicaciones.
      * _Directives_: Funcionalidades de comportamiento.
      * _Pipes_: Pipes en la aplicación.
  * Enviroment: Variables de publicación
  * Main
    * _Layouts_: Marcos de la aplicación (LoginLayout, MainLayout, BlankLayout, etc.). 
    * _Views_: Vistas generales de una pantalla, por ejemplo, el perfil.
      * _Components_: Componentes de un proceso de negocio, por ejemplo, los datos de la persona, facturas de la persona, etc.
      * _Routes_: Rutas hijas que puede tener una vista.
  * Providers
    * _Endpoints_: Rutas de los servicios donde se solicitarán y enviarán datos para procesar el negocio con el Back-end.
    * _Services_: Servicios para la validación de negocio y registro de datos.
    * _Interceptor_: Funcionalidades intermediarias en las peticiones, como agregar el valor de autorización a todas las solicitudes.
    * _Guards_: Seguridad para las rutas, poder verificar si un usuario puede acceder o no a una determinada ruta, como las validaciones de roles.
  * Settings
    * _Config_: Parametros de seguridad
    * _Constants_: Valores constantes o Enumeradores
    * _Lang_: Textos de la aplicación
  * Shared: Funcionalidades compartida para las aplicaciones
    * Common
      * _Files_: Carpetas con clases usadas para todos, clases abstractas, etc.
    * Helpers
      * _Api_: La funcionalidad principal de del llamado a los servicios y helpers para la aplicacion.
      * _Events_: Eventos del navegador en forma de servicio para angular.
      * _Functions_: Funcionalidades globales como un verificador de tamaño del navegador, etc.
      * _Util_: Funcionalidades útiles como conversiones de texto, de fecha, etc.
      * _Notify_: Un notificador de mensajes (alert, warning, errors).
      * _Models_: Representación de objetos/entidades

------


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
