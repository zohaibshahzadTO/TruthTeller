# Feedback Collection Tool

Imagine you're in another persons shoes. Imagine you're a startup owner or a product manager. You're someone that has created and deployed some type of application or service. Now maybe your users are making use of your app and service but you noticed that your users seemed to just suddenly stop using your application altogether. And so step one of figuring out why people are quitting your app is you ask why people are quitting. So lets imagine you are a product manager and at some point in time you want to collect some amount of feedback from your users so that you can understand why people are using, not using it and how you can make it better. Ideally, you might decide to send a bunch of emails to your customers, say around 20, 50, or even 1000 that says "hey there, it would be great if you could give me some feedback so I can better understand how you use our app and whether or not you enjoy it". Maybe some number of your customers replied to your email and give you some amount of feedback and you then tabulate or summarize all of that feedback into one result set and you can then user that to somehow make your application or service better with said feedback.

That being said, we're going to be building an application that will allow a startup owner or a product manager to essentially automatically go through this process. Our application is going to be able to send out bulk email messages to numerous users to collect some amount of feedback. At a high level, this is going to be a feedback collection tool which will be targeted to startup owners, product managers, etc., so they can collect feedback from their individual users. This application will be quite diverse in its feature set.

One of the features being able to send out mass emails to product users. Secondly, maybe we don't want to send out these emails for free, so all of a sudden we may need billing inside of this application which would require us to have separate billing account for our end users which would then require authentication as well. Very quickly, we can see that there will various features that will go into this application.

![alt text](https://github.com/zohaibshahzadTO/FeedbackApp/blob/master/assets/App%20Overview.jpg)

# Tech Stack

Referring to the detailed app overview, when it comes to using Google OAuth to sign in, we'll be making use of an Express back-end server and storing user information inside of Mongo DB. To handle the actual authentication and OAuth process we'll be using a third party library called Passport.js. Passport.js is going to make most of the authentication work easier. Next is handling payments, we wont be taking credit cards numbers direct nor will we take credit cards into our application. Instead, we'll use a third party service called Stripe to handle the billing side of our app. Whenever a user pays us some amount of money, we'll record that amount inside of our Mongo DB. Next, whenever a user attempts to create another campaign or survey, we'll make use of React and Redux. Whenever someone wants to enter a list of emails or some details about what they want to collect as far as surveys and feedback, we'll make use of React, Redux and Redux Form. After we've collected all the information for our campaign to send out, we will send this list of emails to all the surveyees. For that, we'll be using a third party email provider which will take hard integration from our side.

When a surveyee gets the actual email requesting feedback, we need to make sure that we can record the feedback the user presents to us which we'll utilize a combination of our email provider, Express and Mongo DB. To tabulate all feedback given, store it in Mongo DB. Finally, a user can see a report for all of their survey responses. We'll pull out all the feedback that we've been given out of our database and then present it to the user using React + Redux.


# Application Architecture

Whenever a user navigates inside of their browser to our domain, for example, feedback.io. We're going to send them a HTML document and some javascript files that contain a react application. So when the user goes to feedback.io, we're going to send them some files that ill get some content or HTML to appear on the screen. That's going to be the react side of the screen. The react side won't really know what information to display. In our app, we're going to be using Mongo DB which will record and store all the different surveys, campaigns and all the different emails that we send out to people over time. One big problem will be effectively communicating all the data we store inside of our Mongo DB to our React application. The react app will never talk to our Mongo DB and instead we'll implement an Express API that's going to be the middleman. This Express API will contain a bunch of business logic to take incoming requests from the react application, pull some information from our Mongo DB and then send that information back to the react side of our app. The Express API and react app are going to be communicating via HTTP requests (AJAX, JSON).


![alt text](https://github.com/zohaibshahzadTO/FeedbackApp/blob/master/assets/Detailed%20App%20Overview.jpg)


# Relationship between Node and Express

<b>Node:</b>javascript runtime used to execute code outside of the browser. Traditionally, javascript code has always been executed inside of some web browser because that's where its began. It used to execute within the browser, to give interactivity or make them feel more dynamic. Over time people realized that they wanted to use javascript in other locations outside of the browser and that's the source of Node.js.

<b>Express:</b> library that runs in the Node runtime. Has helpers to make dealing with HTTP traffic easier. You can imagine express as being a little collection of functions or helpers for making working with the HTTPS aspects a little easier. So, express isn't its own standalone code base per se or its own runtime. It's a library that has a collection of helper methods to make writing servers easier.


![alt text](https://github.com/zohaibshahzadTO/FeedbackApp/blob/master/assets/Communication%20Chart.png)


The first thing to understand is that when you are running some server on your local machine, your server is going to be listening for HTTP traffic on a single individual port. You can think of a port as being like a little door through which traffic like HTTP requests can be routed. So we might have some incoming request being issued by say, our browser, also running on our local machine. And it might make a request and that request might be coming in to some very specific port on our machine. WE are going to configure Node and Express to listen to traffic that is attempting to access a very specific port on our local machine. Now, Node.js is specifically going to be listening for traffic on that port and waits for some information to flow in through it. Node is then going to take that information that flows in from that incoming HTTP request and hand it off to the Express side of our application. We actually don't need to use Express, we can simply use Node to handle all of the HTTP traffic; however, we're using Express because it makes our lives a bit easier. Express is then going to look at the request and then decide what little bit of logic in the Express application we're building  is going to handle or somehow respond to this incoming request. In Express, we write collections of what are called route handlers. Route handlers are used to handle requests that are asking for a very specific service. So we might have one route handler that's responsible for authenticating a user. We might have another handler that's responsible for logging out a user and we might have a third one that allows a user to create and save a new survey or campaign. To iterate, Node.js is going to take the incoming traffic and route it to Express in which Express will then figure out where to send that request to. We will write the route handlers which will then process the incoming request and generate some outgoing response. The response will then be sent back to the running Node process and Node will then respond to the author or whoever made the HTTP request.


![alt text](https://github.com/zohaibshahzadTO/FeedbackApp/blob/master/assets/nodeexpress.JPG)


# Index.js (Intro to Express)

Creating our first root file called index.js. Inside we'll have a brand new Express application and our first route handler. At the very top, we'll import the Express library. We use the 'require' keyword to get access to the Express library. We'll be using common.js modules in the server side, because at present, the Node.js runtime only has support for common.js modules. Common.js modules is a system implemented in Node.js for requiring or sharing code between different files. The reason we're talking about common.js modules is because in different frameworks or libraries such as React.js, we import express using the 'import' keyword and makes use of a different module system called ES2015 modules. On the front end side of the application, we'll use the ES2015 module system (import syntax). Now we'll also create our for Express application. Inside of a single Node.js project, we might have several different express applications and so by calling Express like a function it generates a new application that represents a running express app. Most apps created use a single application inside of them. The app object is used to setup configuration that will listen for incoming requests that are being routed to the Express side of the app from the node side and then route those requests onto different route handlers. The route handlers we'll be creating eventually over time will all be associated with the app object.

The next two lines written will create a route handler and the associated given route. We'll use the diagram below to analyze the code we've just written. First off is the app object, this represents the underlying running express server. The express server has some number of route handlers associated with it by calling *app.get* like calling that function *get*. We are creating a brand new route handler. That entire segment of code we wrote would be referred to as a route handler. Next is the *get* function. When we call out *get*, this tells express that we want to create a route handler that is watching for incoming HTTP requests with a very specific method. HTTP request methods are used to indicate the type or kind of what the request is attempting to accomplish. So we made a route handler associated with the *get* method.


![alt text](https://github.com/zohaibshahzadTO/FeedbackApp/blob/master/assets/expressdetail.JPG)


Express has access to several other methods as well. Using the *get* word is associated with getting information about some particular record. We can also set up route handlers that are associated with other methods as well. In the diagram below, you can see other options such as *app.post*, *app.put*, etc. Each of those request methods are associated with some intent. Over time, we're going to be using some these different methods to create different route handlers that are associated with different purposes of incoming requests.


![alt text](https://github.com/zohaibshahzadTO/FeedbackApp/blob/master/assets/appdotexpressdetail.JPG)


Next the forward slash (*/*) tells express to watch for incoming requests that are attempting to access some very particular route. And so we refer to this (*/*) as the route portion of the handler.

So now onto the arguments to the arrow function which the second argument of the *Get* request handler. The first argument is referred to as *req* (request). Its a javascript object that represents the incoming request. So it has a bunch of data that says a little bit about who is making the request and some associated data with it. Next, is the *res* argument which represents response. It represent the response or the data that is about to be sent back to whoever made the incoming request. Next is the body of the function, we put in there *res.send* and then we provided a plain javascript object that tells express that we want to immediately close the request and send back a response containing the JSON data: *hi: "there"*.

The last line we have at this point is *app.listen(5000)* which instructs express to tell Node that it wants to listen for incoming traffic on port 5000.  

# Application Deployment

It's a little soon to deploy the app since we've only just worked on the barebones of the project; however its better to get it out of the way first. Heroku as well as other deployment sites will have a checklist developers must follow. The diagram below perfectly summarizes each step.


   ![alt text](https://github.com/zohaibshahzadTO/FeedbackApp/blob/master/assets/herokudeploymentlist.JPG)


First comes the dynamic port binding. In a nutshell, when we deploy our application, Heroku is going to expect us to listen for incoming HTTP traffic on a particular port.
If you go back to index.js, you'll see that express is telling Node to listen to incoming HTTP traffic on port 5000. However, when we deploy on Heroku, Heroku will tell us which port we need to listen to instead. This is done because Heroku hosts many differnt applications on a single server or a single machine and it wants the ability to just dynamically tell us where traffic is going to be coming from. In order to setup the dynamic port binding, go to index.js add an additional line *const PORT = process.env.PORT;*.

Whenever Heroku runs our application, it has the ability to inject what are called environment variables. Environment variables are variables that are set in the underlying runtime that Node is running on top of. Its essentially Heroku's opportunity to pass us runtime configuration or some configuration that Heroku only wants to tell us after what have actually deployed or app, so we cant look up on Heroku what our port is going to be ahead of time. We have to wait until the very last second when our app is starting to be executed by Heroku to figure out what our port is and that's what that line of code represents. It says "looks at the underlying environment and see if they have declared a port for us to use".

The trick here is that if we are running production and if Heroku is running our app, then we can freely use this process (env.PORT). However, if we are running our ode inside of a development environment like on our machines like as we are at the moment, then that variable might not actually be defined. So to handle the case in which we are running in a development environment we're going to add on a simple boolean statement saying " || 5000 ". Overall it now says "if there is an environment variable that has been already defined by Heroku, go ahead and assign that variable to port...otherwise by default, just use the value of 5000". And so in development, we'll use 5000 and in production, we'll use whatever port Heroku is attempting to provide us.

The second step is to tell Heroku what specific Node environment we want to use. Heroku tends to use an older version of the Node environment and if we ran our app on it, it would inevitably crash. On our package.json file, we've created an engines script that specifies the environment. See the package.json file within the repo to check the specific Node environment we've entered.

The third step is the start script. So when we deploy our app, we have to tell Heroku what command it should run to start up our server. See our package.json file under the script section which it should say "start": "node index.js".

The last step is creating a .gitignore file. The purpose of this file is to make sure that we do not accidentally commit any of the dependencies that we have created or installed. The node_modules folders that was automatically created when installed Express don't get committed and detected by Heroku when we deploy them. We let Heroku install its own dependencies. Overall, we don't want our dependencies to version control when we deploy our app.
