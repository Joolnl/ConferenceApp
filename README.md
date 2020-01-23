# ConferenceApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.0-rc.8.

## Building the application

Run `npm install` to install all required node_modules. After this run `ng build` to distribute the angular application. After building the application run `npm run scully` to create a static site.

## Running the application

After building the application serve the application with an http server for example [http-server](https://www.npmjs.com/package/http-server).

### When using http-server (package)

Use `http-server dist/static` to run the application.


## Blueprint

To add a new conference/post you can create a new markdown file inside `/markdown/confereces` and `/markdown/posts`.

Each markdown has to meet the following blueprint:

```
---
title: '' (required)
description: '' (required)
author: '' (required)
conference: '' (optional)
location: '' (required for conferences, optional for posts)
date: 'yyyy-dd-mm' (required)
speaker: '' (required for posts, optional for conferences)
tags: 'tag1, tag2, tag3' (required)
image: 'http://placekitten.com/g/1920/1080' (required)
---

#### Description 
Tell something about this post/conference

#### Interesting videos
Place your urls to the videos

#### Links to presentations 
Place your urls to the presentations
```

Meta data and Description are required in each markdown file.
The description defined in the meta data is used as an introduction text on the overview page.