# Development Guide

All project tools must be compatible between OSX and Linux systems. The standard project tools appear below.

## Sublime Text 3
Sublime Text 3 is the chosen editor for members of the EvenStevens project. You can use whatever text editor or IDE you choose, however using Sublime Text with the settings described below will make it easier to adhear to project style guide and coding standards.

### Project File (coming)

The project file standardizes a key editor settings between project members. For example, the file sets a default tab size for all new files to '2' and automattically translates all tab input to spaces. Another helpful setting; it displays two verical lines in the editor, the first (60 spaces) marks the border for comments, the second (80 spaces) marks the border code.

### Plugins

Project plugins are seprated to the groups 'suggested', 'linters', and 'themes'. The suggested plugins are optional but strongly recommended for project synchronicity.  The linters are mandatory.  A small amount of study is required ahead of configuration.  Themes are optional but installing at least one of them is recommended, as they will help with linter highlighting, sidebar organization, and more.

#### Suggested Plugins

* Sidebar Enhancements
* DocBlockr
* File​Header
* Markdown Preview
* Alignment
* JavaScriptNext ES6 Syntax
* Bracket Highlighter
* Pretty JSON
* Emmet
* Color Highlighter
* SCSS (text mate bundle)
* Jasmine JS

#### Linter Plugins

Remember to [Read The Docs](http://www.sublimelinter.com/en/latest/index.html) before installing! For information specific to connecting your linters to Sublime Text themes, [check out the usage page](http://www.sublimelinter.com/en/latest/usage.html).

* SublimeLinter
* SublimeLinter-jshint
* SublimeLinter-contrib-scss-lint

### Themes

Themes are optional. Your theme selection is largely a matter of preference. The most useful themes can be combined with linters to present graphic feedback on warnings and errors.  For example, ITG Flat, a project-favorite theme, can be setup inside `Preferences.sublime-settings` to affect Sublime Text's theme and color scheme.

```
{
  "color_scheme": "Packages/User/SublimeLinter/itg.dark (SL).tmTheme",
  "show_color_scheme_info": true,
  "theme": "itg.flat.dark.sublime-theme"
}
```

Decentralized Saxophone's list of favorite themes appears below:

* [ITG Flat](http://itsthatguy.com/post/70191573560/sublime-text-theme-itg-flat)
* [Farzer](http://devthemez.com/farzher)
* [Spacegray](http://kkga.github.io/spacegray/)
* [Afterglow](http://yabatadesign.github.io/afterglow-theme/)


### ZSH

ZSH is an command line terminal with powerful capabilities. It comes from bash, ksh, and tcsh. Installation of this command line terminal is optional. 

### Getting Set Up

#####Development Environment (Additional information can be found on EvenSteven's [wiki](https://github.com/decentralizedsaxophone/evenstevens/wiki))

Install necessary Node modules with the following command: 

<code>npm install</code>

Our application uses Node v 0.10.38 in order to run Jest Testing on our code base. First check your current Node version.  

<code>node -v</code>

We are now going to use n to switch between different versions of node. Run the following command to install n globally. Afterwards, use n to install version 0.10.38 of node. 

```
sudo npm install -g n

sudo n 0.10.38
```

At this point, you will have version 0.10.38 of Node. You will need to select it to switch over to it. 

<code>sudo n</code>

Then select version 0.10.38. Check your node version again with <code>node -v</code> and you should be running 0.10.38. 

As for installing the Redis database, you need to run the following commands. This assumes you have [Homebrew](http://brew.sh/) installed on your computer. `redis-server` starts the redis server in your terminal. You will need to run the node server in a different terminal tab. 

```
brew update

brew install redis

redis-server
```

For our app's optical character recognition, we used Tesseract. You'll need to install this in order to convert the receipt images to text. Run the following commands: 

```
brew update

brew install tesseract
```
Please note that the commands above only install the English package. To install other languages, please consult their [site](https://code.google.com/p/tesseract-ocr/downloads/list) 

At this point, you are ready to start the Redis and Node servers on your terminal. I generally prefer to use <code>nodemon</code> to run my node server on my machine. It has a watcher that restarts your server whenever you change any files in your directory. With that said, you'll need to start up your redis server first before you start the node server. In two separate terminal tabs, run the following commands: 

```
redis-server

gulp
```
the <code>gulp</code> command actually performs the entire build process of your site. You will find many tasks that are automated in there. Check them out!!

You will want to interact with the Redis database that you set up. You can read about commands [here](http://redis.io/commands). To access the command line for the database, run the following command in a third tab: 

```
http://redis.io/commands
```

#####Deployment Environment

Our team (Decentralized Saxophones) deployed on Digital Ocean. Please contact us for details to access the server. 

### Testing

##### CasperJS and PhantomJS Setup

To install PhantomJS using npm:

<code>npm install phantomjs -g</code>

And for CapserJS:

<code>npm install casperjs -g</code>

To run CasperJS test file (from project root):

<code>$ casperjs test server/casperTest.js</code>