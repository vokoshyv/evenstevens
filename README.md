# evenstevens

Large dinner parties are fun, but they can be stressful when the bill arrives. Determining who had what and how much they owe is a Herculean task. 

Even Stevens is a web service that provides a bill summary to the table, allows everyone to claim their items, and automatically calculates totals.

## How it works

Just take a picture of the bill with your smart phone and send the image off to Even Stevens. We'll take this image, parse out the text, and send you a unique URL to share with your table. 

Once everyone goes to the the URL, they can claim their entree, appetizer, and/or dessert. But wait, there's more!! With Even Stevens, dinner members can even split shared items! 

Even Stevens calculates the amount owed for each person at the table including tax and tip! 

Simple. Easy. Even. 

## Getting Set Up

#####Development Environment (Additional information can be found on EvenSteven's [wiki](https://github.com/decentralizedsaxophone/evenstevens/wiki))

After forking over this project and cloning it down to your machine, install necessary Node modules with the following command: 

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
redis-cli
```

## Contributing

Please read our [contributing](https://github.com/decentralizedsaxophone/evenstevens/blob/master/documentation/CONTRIBUTING.md) guide on how to contribute to EvenStevens!!