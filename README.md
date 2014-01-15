Angular Seed [![Build Status](https://travis-ci.org/federicot/angular-seed.png?branch=master)](https://travis-ci.org/federicot/angular-seed)
============

Install
-------
1. `npm install`
2. `npm install -g grunt-cli`
3. `npm install -g bower`
4. `bower install`

Development
-----------
Install [livereload](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-)

1. `grunt devserver`

Production
----------
1. `grunt build`
2. `grunt webserver`

Testing
-------
#### Install
Download [selenium-server-standalone] (https://code.google.com/p/selenium/downloads/list)  
Download [chromedriver] (http://chromedriver.storage.googleapis.com/index.html)

1. `cp /path/to/selenium-server-standalone.jar node_modules/protractor/selenium/`
2. `cp /path/to/chromedriver node_modules/protractor/selenium`
3. `chmod u+x node_modules/protractor/selenium`

#### Run
1. `grunt test`
