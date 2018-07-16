# Simple gulp builder

## Overview

Simple gulp builder can be used for development of simple pages. If you need to build sass and js code with support of IE8

## Install

Builder uses:

* Gulp v4.0.0
* Node v.8.11.2
* npm v5.6.0

Download init structure and run `$ npm install` in the directory with gulpfile.js. To start developing run `$ gulp`. If you are ready for production run `$ gulp dist`.

## Structure

```
├── app             #Folder with source files
├── tasks           #Folder with tasks for gulpfile
├── README.md
├── gulpfile.js     #File with gulp tasks
└── package.json    #File with dependencies
```

## `app` folder structure

```
├── css             #Folder will be created with Gulp
├── fonts           #Folder should contain font files
├── images          #Folder for images
├── js              #Folder for compiling `*.js` files. Also it can contain your `*.js` files
├── lib             #Folder for JS files. These files will be concat to `app.js` file in `js` folder
├── scss            #Folder with styles
    ├── base        #Folder with base styles
    ├── components  #Folder with styles of component of the web application
    ├── vendors     #Folder with vendor styles
```