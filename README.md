# The Truth Teller (Feedback Collection Application)

Imagine you're in another persons shoes. Imagine you're a startup owner or a product manager. You're someone that has created and deployed some type of application or service. Now maybe your users are making use of your app and service but you noticed that your users seemed to just suddenly stop using your application altogether. And so step one of figuring out why people are quitting your app is you ask why people are quitting. So lets imagine you are a product manager and at some point in time you want to collect some amount of feedback from your users so that you can understand why people are using, not using it and how you can make it better. Ideally, you might decide to send a bunch of emails to your customers, say around 20, 50, or even 1000 that says "hey there, it would be great if you could give me some feedback so I can better understand how you use our app and whether or not you enjoy it". Maybe some number of your customers replied to your email and give you some amount of feedback and you then tabulate or summarize all of that feedback into one result set and you can then use that to somehow make your application or service better with said feedback.

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

**Node:**javascript runtime used to execute code outside of the browser. Traditionally, javascript code has always been executed inside of some web browser because that's where its began. It used to execute within the browser, to give interactivity or make them feel more dynamic. Over time people realized that they wanted to use javascript in other locations outside of the browser and that's the source of Node.js.

**Express:** library that runs in the Node runtime. Has helpers to make dealing with HTTP traffic easier. You can imagine express as being a little collection of functions or helpers for making working with the HTTPS aspects a little easier. So, express isn't its own standalone code base per se or its own runtime. It's a library that has a collection of helper methods to make writing servers easier.

![alt text](https://github.com/zohaibshahzadTO/FeedbackApp/blob/master/assets/Communication%20Chart.png)

The first thing to understand is that when you are running some server on your local machine, your server is going to be listening for HTTP traffic on a single individual port. You can think of a port as being like a little door through which traffic like HTTP requests can be routed. So we might have some incoming request being issued by say, our browser, also running on our local machine. And it might make a request and that request might be coming in to some very specific port on our machine. WE are going to configure Node and Express to listen to traffic that is attempting to access a very specific port on our local machine. Now, Node.js is specifically going to be listening for traffic on that port and waits for some information to flow in through it. Node is then going to take that information that flows in from that incoming HTTP request and hand it off to the Express side of our application. We actually don't need to use Express, we can simply use Node to handle all of the HTTP traffic; however, we're using Express because it makes our lives a bit easier. Express is then going to look at the request and then decide what little bit of logic in the Express application we're building is going to handle or somehow respond to this incoming request. In Express, we write collections of what are called route handlers. Route handlers are used to handle requests that are asking for a very specific service. So we might have one route handler that's responsible for authenticating a user. We might have another handler that's responsible for logging out a user and we might have a third one that allows a user to create and save a new survey or campaign. To iterate, Node.js is going to take the incoming traffic and route it to Express in which Express will then figure out where to send that request to. We will write the route handlers which will then process the incoming request and generate some outgoing response. The response will then be sent back to the running Node process and Node will then respond to the author or whoever made the HTTP request.

![alt text](https://github.com/zohaibshahzadTO/FeedbackApp/blob/master/assets/nodeexpress.JPG)

# Index.js (Intro to Express)

Creating our first root file called index.js. Inside we'll have a brand new Express application and our first route handler. At the very top, we'll import the Express library. We use the 'require' keyword to get access to the Express library. We'll be using common.js modules in the server side, because at present, the Node.js runtime only has support for common.js modules. Common.js modules is a system implemented in Node.js for requiring or sharing code between different files. The reason we're talking about common.js modules is because in different frameworks or libraries such as React.js, we import express using the 'import' keyword and makes use of a different module system called ES2015 modules. On the front end side of the application, we'll use the ES2015 module system (import syntax). Now we'll also create our for Express application. Inside of a single Node.js project, we might have several different express applications and so by calling Express like a function it generates a new application that represents a running express app. Most apps created use a single application inside of them. The app object is used to setup configuration that will listen for incoming requests that are being routed to the Express side of the app from the node side and then route those requests onto different route handlers. The route handlers we'll be creating eventually over time will all be associated with the app object.

The next two lines written will create a route handler and the associated given route. We'll use the diagram below to analyze the code we've just written. First off is the app object, this represents the underlying running express server. The express server has some number of route handlers associated with it by calling _app.get_ like calling that function _get_. We are creating a brand new route handler. That entire segment of code we wrote would be referred to as a route handler. Next is the _get_ function. When we call out _get_, this tells express that we want to create a route handler that is watching for incoming HTTP requests with a very specific method. HTTP request methods are used to indicate the type or kind of what the request is attempting to accomplish. So we made a route handler associated with the _get_ method.

![alt text](https://github.com/zohaibshahzadTO/FeedbackApp/blob/master/assets/expressdetail.JPG)

Express has access to several other methods as well. Using the _get_ word is associated with getting information about some particular record. We can also set up route handlers that are associated with other methods as well. In the diagram below, you can see other options such as _app.post_, _app.put_, etc. Each of those request methods are associated with some intent. Over time, we're going to be using some these different methods to create different route handlers that are associated with different purposes of incoming requests.

![alt text](https://github.com/zohaibshahzadTO/FeedbackApp/blob/master/assets/appdotexpressdetail.JPG)

Next the forward slash (_/_) tells express to watch for incoming requests that are attempting to access some very particular route. And so we refer to this (_/_) as the route portion of the handler.

So now onto the arguments to the arrow function which the second argument of the _Get_ request handler. The first argument is referred to as _req_ (request). Its a javascript object that represents the incoming request. So it has a bunch of data that says a little bit about who is making the request and some associated data with it. Next, is the _res_ argument which represents response. It represent the response or the data that is about to be sent back to whoever made the incoming request. Next is the body of the function, we put in there _res.send_ and then we provided a plain javascript object that tells express that we want to immediately close the request and send back a response containing the JSON data: _hi: "there"_.

The last line we have at this point is _app.listen(5000)_ which instructs express to tell Node that it wants to listen for incoming traffic on port 5000.

# Application Deployment

It's a little soon to deploy the app since we've only just worked on the barebones of the project; however its better to get it out of the way first. Heroku as well as other deployment sites will have a checklist developers must follow. The diagram below perfectly summarizes each step.

First comes the dynamic port binding. In a nutshell, when we deploy our application, Heroku is going to expect us to listen for incoming HTTP traffic on a particular port. If you go back to index.js, you'll see that express is telling Node to listen to incoming HTTP traffic on port 5000\. However, when we deploy on Heroku, Heroku will tell us which port we need to listen to instead. This is done because Heroku hosts many differnt applications on a single server or a single machine and it wants the ability to just dynamically tell us where traffic is going to be coming from. In order to setup the dynamic port binding, go to index.js add an additional line _const PORT = process.env.PORT;_.

Whenever Heroku runs our application, it has the ability to inject what are called environment variables. Environment variables are variables that are set in the underlying runtime that Node is running on top of. Its essentially Heroku's opportunity to pass us runtime configuration or some configuration that Heroku only wants to tell us after what have actually deployed or app, so we cant look up on Heroku what our port is going to be ahead of time. We have to wait until the very last second when our app is starting to be executed by Heroku to figure out what our port is and that's what that line of code represents. It says "looks at the underlying environment and see if they have declared a port for us to use".

The trick here is that if we are running production and if Heroku is running our app, then we can freely use this process (env.PORT). However, if we are running our ode inside of a development environment like on our machines like as we are at the moment, then that variable might not actually be defined. So to handle the case in which we are running in a development environment we're going to add on a simple boolean statement saying " || 5000 ". Overall it now says "if there is an environment variable that has been already defined by Heroku, go ahead and assign that variable to port...otherwise by default, just use the value of 5000". And so in development, we'll use 5000 and in production, we'll use whatever port Heroku is attempting to provide us.

The second step is to tell Heroku what specific Node environment we want to use. Heroku tends to use an older version of the Node environment and if we ran our app on it, it would inevitably crash. On our package.json file, we've created an engines script that specifies the environment. See the package.json file within the repo to check the specific Node environment we've entered.

The third step is the start script. So when we deploy our app, we have to tell Heroku what command it should run to start up our server. See our package.json file under the script section which it should say "start": "node index.js".

The last step is creating a .gitignore file. The purpose of this file is to make sure that we do not accidentally commit any of the dependencies that we have created or installed. The node_modules folders that was automatically created when installed Express don't get committed and detected by Heroku when we deploy them. We let Heroku install its own dependencies. Overall, we don't want our dependencies to version control when we deploy our app.

# Heroku Deployment

![alt text](https://github.com/zohaibshahzadTO/FeedbackApp/blob/master/assets/moredeploymentimage.JPG)

We will not be delving any further details regarding deployment onto Heroku. The diagram above has good instruction on what to do as well as the following links below:

<https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up>

<https://devcenter.heroku.com/articles/heroku-cli>

# What is OAuth?

OAuth (Open Authorization) is an authorization protocol. A third party application can use it to access user data from a site like Google or Twitter without revealing their password. Sites such as Quora, Medium and many others offer authentication using OAuth.

It makes our lives simpler by eliminating the need to remember the password of every account you create on most websites. You just have to remember your OAuth providers main account password.

# THe OAuth Flow

Below is a diagram that goes in-depth of what the flow Open Authentication protocol looks like. OAuth will be the most difficult of all components of the app to implement. We'll start off what happens when a client or user clicks the 'Login to google' button. When that happens, we direct them to a route of something like localhost:5000/auth/google. To recall, localhost:5000 is the current address that we are using to host our serer. Now the route they're going to be accessing is _auth/google_. There is nothing inherently important about that route name, we're simply creating that path based on whether the user want to authenticate via Google. So whenever we're receiving that user, our server will tell us that someone is trying to authenticate via Google with our application. We take that incoming request and forward it on to Google. We understand they're trying to login our app via Google OAuth, and so we forward their incoming request over to Google servers and make sure they grant our application permission to read about your profile on Google. We direct them to google.com/auth?appId=123\. The appId is very important we'll delve into it soon. When we forward their request, Google will then show them some permission page asking permission to the user's profile. The user will then grant us permission to that person's profile. When the user grants permission, Google automatically re-directs them to an address of localhost:5000/auth/google/callback?code=456\. What's relevant about that address is the code or parameter and its important to us. Google is putting that code inside the URL. We then are going to put the user on hold and take the 'code' from the URL. We're going to use that code to make a follow up request from our server directly over to Google. The code is important because it's what allows us to reach back to Google and say "hey, we're pretty sure this user who is pending on our server just gave us permission and you just gave us this code and so we want to exchange this code for some information about that user. Give us their email, profile, identifying information" and Google will comply. So we'll receive those user details and we're going to record those user details inside of our database and then we'll essentially do a few tasks to uniquely identify this user in follow up requests and so on. After two more steps which we will delve into later on, the user would be logged into our web application. In the future for any follow-up requests that user ever makes such as resources we need from the API or trying to pay some money to our application, or we're trying to create a new campaign we would request additional information from our user.

![alt text](https://github.com/zohaibshahzadTO/FeedbackApp/blob/master/assets/OAuth%20Flow%20Diagram.jpg)

# Intro to Passport.js

Passport is a middleware which implements authentication on Express-based web applications. It provides over 500+ strategies. What are these strategies? Strategies are used to authenticate requests. Each strategy has its own npm package such as passport-twitter, passport-google-oauth20\. A strategy must be configured before usage. We're going to be using this library for a major part of the OAuth component for this application. However, there are two things that Passport.js does not do very well. Although Passport.js does help with automating the OAuth flow, it requires us to reach in to some very specific points in the flow and add some snippets of code to help streamline the process. It automates vast majorities of the flow but not the entire flow. The reason that's a problem is that sometimes when you're setting up OAuth, you get the feeling you don't really understand the overall big picture and it feels like you're just adding in some weird code in some places without understanding how it all fits together. The second issue lies in how the library is structured. When we make use of Passport.js, we're actually installing at least two different libraries. The first being called passport. The core passport library or module is a set of general functions objects and helpers that make authentication work nicely inside of Express. So some very generic logic that can handle the idea of authentication with Express. To actually implement an authentication flow with a specific provider such as Google, Facebook, Github, etc., we install what are called passport strategy. There are many different strategies out in the world an each individual strategy helps you setup authentication with one very specific provider. So this is the second confusing issue which is understanding what you're actually installing. You always install the base passport module and then you also install at least one passport strategy that will help handle authentication with one specific provider.

![alt text](https://github.com/zohaibshahzadTO/FeedbackApp/blob/master/assets/passportlibrarycollection.JPG)

# Reasons to use Passport.js

- Its lightweight
- Easily configurable
- Supports persistent sessions
- Offers OAuth
- Provides separate modules for each strategy
- Gives you the ability to implement custom strategies

# Installing Passport.js

To install both the passport core module and the google passport strategy, we'll enter the following in our terminal:

```
npm install --save passport passport-google-oauth20
```

# Implementing Passport Google Strategy

First, we'll be deleting the initial route handler we originally created in the index.js file. That was simply a started route handler to experiment with Express. Now we'll be setting up a few constants and assigning them the passport core module and passport-google-outh20 module.

Now the passport Google OAuth20 module actually exports a couple of different properties and we only care about one particular property which is the strategy property which we'll add at the end. So we no have passport which gives Express the idea of how to handle authentication and then the google strategy which we use to instruct passport on exactly how to authenticate our users with google oauth. We're now going to take our passport library and inform it that it should understand how to make use of the google strategy inside of our app.

```
passport.use(new GoogleStrategy());
```

Let's start with what's going on inside of the function call. _new GoogleStrategy_ creates an new instance of the Google Passport Strategy. It essentially says "hey application, I want to somehow be able to authenticate my users with Google" and inside of the new GoogleStrategy constructor, we're going to pass in some configuration that tells this Google strategy how to authenticate users inside of our application. You can think of _passport.use_ as some generic register, something to say "hey passport, you know how to handle authentication in general but you don't really know how to authenticate users with a very specific service or provide. So you can think of it as saying "passport, I want you to be aware that there is a new strategy available and here it is. Understand the users can use this to authenticate themselves inside of our application.

# Enabling Google OAuth API

We left things off in that we need to now pass some additional configuration options to the Google Strategy. Before we make use of the Google Strategy, we have to give it two important options, a client ID and a client secret. Both are provided directly from Google's overall service. Recall when we went through the OAuth flow, we had said that we would take some user who is trying to visit and login to the app or _/auth/google_ we would forward them on to Google where they would then be asked to grant us permission to their profile. Lets now sign up for the Google OAuth API. By going on to the website below:

```
https://www.console.developers.google.com
```

We can now sign in with our google account, create a new project (feedback-dev) and then enable the API. Something that confuses people using the google oauth api for the first time may have trouble finding it. You need to search for the "Google+API". After enabling the API in our accounts, we want to now generate the API credentials. By doing so we'll generate the Client ID and Client Secret.

# Securing API Keys

Now that we've generated our client ID and secret, we're going to hook the key upto our Google Strategy very shortly.

Lets discuss what each key actually does. First the clientID. This key acts as a public token and its completely ok if anyone else in the world gets access to that clientID. All it does is identify our application to Google servers. However, the client secret is a much more secure piece of information as evidenced by the word secret. If someone else gets access to our client secret then all of a sudden, they will have elevated privileges. We want to make sure we don't accidentally share this with the outside world. So why is this relevant? At present, we have committed our project using git version control and deployed it via Heroku. Well if we put this project onto Github which I've been doing since the inception of this project, all of a sudden everyone in the world has access to our repository and can read our client secret. So right now we need to secure our client secret away from the public. We just simply create a folder called 'config' and store a new file called 'keys.js' where we'll have the clientID and client secret within a module object and the notify the gitignore file that it shouldn't commit that file to source control.

# Google Strategy Options

What we'll do now is import the ClientID and ClientSecret and we do that by importing the key.js file into the index.js file and assigning it to a const variable. After we can then pass those two keys to the Google Strategy. For the first argument of the GoogleStrategy, I'm going to add an empty object and then give it a key of ClientID and the ClientSecret and assign those keys from the key.js file. The is another argument or option that we'll add shortly but lets recall the OAuth flow. The tricky part during the flow is after the user grants permission to our application to retrieve their information. We had said that they get redirected back over to our server but what address or what route? We have to manually specify where we want the user to be sent to. In the OAuth flow diagram above, we stated that the user gets sent back to our server on the route of _auth/google/callback_. And so presumably we all have some route handler here or some logic to say whenever a user comes to this route, we want to then take the code and have follow-up requests done via Google servers. So the third option that we're going to pass into the GoogleStrategy is the route _auth/google/callback_. After doing so, we'll shortly add a route handler to our express application to handle a user coming back to our application on this route right here. There's one more argument we're going to provide to the GoogleStrategy before we close out that object.

# Testing OAuth

In this section, we're going to be testing our OAuth flow and then put together some configuration to say "hey, whenever a user goes to '/' or '/google' we should then start the entire process being managed by passport". Recall that we'll have Express do different things based on what route a user visits, we put together a route handler. Right now we'll put together a route handler inside of our app that makes sure that user gets kicked into this passport flow (see index.js update).

Enter the following into your terminal:

```
node index.js
```

Visit the following address:

```
localhost:5000/auth/google
```

You'll notice an error that says "redirect_uri_mismatch". We'll delve into it shortly and figure out what that really means.

# Authorized Redirect URI's

Let's dissect the following URL that resulted in the earlier error.

```
https://accounts.google.com/o/oauth2/v2/auth?
response_type=code&
redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&
scope=profile%20email&
client_id=5919214599-btpefgmd9uaj54cr703plcmn9jgqgrlv.apps.googleusercontent.com
```

The very first property we have is the response type and its saying we're expected a code back. Recall that the user grants permission to our app and the user would be sent back to our app with this code that we can use to exchange with Google to get some information about the users profile. We get that certain and get code and can use it to make a follow-up request to Google to ask for some more information about that user. So that's working out well.

The next property is part of our error message we got. Lets skip that for now. The next property is the scope which encompasses the two pieces of information we're asking for. And then finally we also have the client ID which identifies our app to Google's servers.

Now lets talk about the error message tied to our URL. If you look closely you'll see HTTP, localhost, 5000, auth, google, callback. So the redirect URI is the address that a user should be redirected to from Google after they give permission to our app. But here's the problem, imagine that we're hackers and we want to somehow hijack a user's authentication OAuth flow. Maybe if we took this entire URL which attempts to authenticate some user and tell the user "hey, these people over her like whoever owns this ID and wants to get access to your user account". Lets say we replaced the clientID with a really official clientID because recall that the clientID is public. So maybe we took AirB&B's clientID from Google Earth and we put it in here and then we wanted to hijacks the user and think they were authenticating with AirB&B, but in fact we we're going to send them back to our servers and record all of their account information which is obviously malicious. One way we could pull this off is by changing the redirect URI into another route address of ours and so now if we could get away with this, we could trick the user into clicking this lin. The user would be presented with some message that says "oh it looks like AirB&B is trying to get access to your profile" but then the google server would send them back to our malicious server and steal their information. So how does that relate to us?

Well our error was 'URI redirect mismatch'. In other words when setup our oauth flow and we said send the user back to '/auth/google/callback', we had not properly setup our account to say that, that was a valid URI to redirect that user to. Google internally tracks what valid URI's or URL's a user can be redirected to so that malicious users can't just replace the redirect URI to another random route. How do we fix it? They pasted the link where we could go to verify and make that address official.

<https://console.developers.google.com/apis/credentials/oauthclient/5919214599-btpefgmd9uaj54cr703plcmn9jgqgrlv.apps.googleusercontent.com?project=5919214599>

We made 'localhost:5000/auth/google/callback' an authorized redirect URI and that actually the link that would kick off our OAuth flow as well. Now its accessible.

# OAuth Callbacks

If we enter the following URL:

```
localhost:5000/auth/google
```

We'll actually be taken the google login where we can perform OAuth using our google email and so on. However you'll quickly discover after clicking it that we'll be redirected to an error which says "Cannot GET /auth/google/callback". Our server does not yet have a route handler setup to handle a request coming into our server. If you look at the URL then, you'll notice a code which is the code google has given us so we can follow up with them and retrieve the users information.

# Access and Refresh Tokens

Last section, we saw that after running the app and going on "localhost:5000/auth/google" we could finally sign in. After a few more steps and after our server followed up with Google servers with the code it was granted, it exchanged it with users actual profile and email address. After the follow up request is made, the callback function or the arrow function which is the second argument to the GoogleStrategy was executed. So that arrow function is our opportunity to take all the information that we just got back from Google such as the access token and user information is our opportunity to create a new user inside of our database that says "hey here's this person, they have signed up before using Google. They now have access to our application and they can create surveys and all that kind of good stuff inside of our app". The access token proves that we have been granted permission to the users information and allows us to follow up and request more. The refresh token allows us to refresh the access token. The access token automatically expires after some amount of time and we can be given optionally a refreshed token that allows us to automatically update the access token and essentially reach into the users account for more additional time.

At this point we've finally completed the passport portion of the OAuth flow and now its upto to us to create a new record inside of our database and then figure a way of making the user considered to be logged into our app.

# Nodemon Setup

Everytime I've been making changes to the OAuth flow, I've had to manually restart the server. We're going to install a module that allows to us make changes without doing that. Go onto the terminal and install the following:

```
npm install --save nodemon
```

Go to the package.json file and under scripts, enter a new script called:

"dev": "nodemon index.js"

We've now installed nodemon and instead of starting our server constantly with this command, we instead define this dev script inside of our scripts section which now allows any other developer in the future to come start the server with that command and then being able to make changes without restarting it.

To test it out, enter the following into terminal:

```
npm run dev
```

Now if you go back into the index.js file and make any change and save it, nodemon will restart the server automatically and reflect on those changes.

# Server Structure Refactor

Below is diagram depicting how we'll be restructuring our whole index.js file, our main focus being the passport modules. We already have a config folder which holds all of our API keys and maybe any other configuration information that we might need. We'll then add two more folders: the routes folder which will have one file for each group of routes that we have. Currently, we have two handlers inside of our index.js file and they both have something to with authentication. And so we'll have a single file inside of our routes folder to handle both of these handlers because they're very similar in function. Next we will also create a services directory which will house a bunch of logic that kind of helps or configures our express app that way we expect. And so in that file, we'll have a js file where we're going to put in all of our passport configuration like the _passport.use_ statement that configures our GoogleStrategy.

![alt text](https://github.com/zohaibshahzadTO/TruthTeller/blob/master/assets/refactorimg.JPG)

# Theory of Authentication

We've pretty much completed the few steps that were involved with passport.js regarding OAuth. Currently, our task is to now get user details and create a new record in the database using MongoDB. Before we delve into that, lets dive a little deeper into why we even need a database, why even use OAuth in the first place and why does authentication even mean?

The first thing to understand is HTTPS is stateless. We communicate between our browser and our Express web server by HTTP requests. HTTPS is stateless and what that means is that any two given requests that we make, HTTP inherently has no way to identify or share information between two separate requests. So you can really identify who is making any given request between any given number of requests. How do we get around this?

![alt text](https://github.com/zohaibshahzadTO/TruthTeller/blob/master/assets/theoryofauth.JPG)

The diagram below summarizes what happens with every authentication scheme. You have your browser and the browser makes some requests to some server and says "hey please, log me in", and you provide the login information and the server receives it. The server then send out some identifying piece of information that is unique to you. It responds with that unique information along with request back to the server. We can refer to that as cookie, token, etc. That cookie is your proof that 5 minutes ago or one day ago, you logged into the application and the unique key corresponds to you. When you make that follow-up request to the server and include that cookie, the server sees that cookie and confirms it. The server then follows up with all the emails, posts, tweets that belong to you specifically.

![alt text](https://github.com/zohaibshahzadTO/TruthTeller/blob/master/assets/theoryofauth2.JPG)

Inside our application, we are going to use cookie based authentication. What that means is that when we get some initial request to our server, like our express API, we're going to say "please log me in". For us its going to be Google OAuth. After the user goes through the OAuth process, we're going to generate some identifying piece of information. In the response that we send back to the user for the OAuth request, we're going to include what is called a "header" inside of the response that gets sent back to the browser. The header is going to have a property called "set-cookie" and its going to set to be some random token which will uniquely identify the user. When the browser sees this response come back and it sees in the header of the request, it will automatically strip of the token and store it into the browsers memory and is going to automatically append that cookie with any follow-up request sent to the server and the server will recognize it.

# Signing in User via OAuth

We need to find some unique identifying token in the user's Google profile which is consistent between logins. It will be the Google User ID (not the email address since its subject to change). We'll use that to decide if the user is the same. The Google User ID never changes for an individual.

![alt text](https://github.com/zohaibshahzadTO/TruthTeller/blob/master/assets/clientId%26Secret.JPG)

# Difference between Relational Databases and NoSQL Databases

**SQL databases** use structured query language (SQL) for defining and manipulating data. On one hand, this is extremely powerful: SQL is one of the most versatile and widely-used options available, making it a safe choice and especially great for complex queries. On the other hand, it can be restrictive. SQL requires that you use predefined schemas to determine the structure of your data before you work with it. In addition, all of your data must follow the same structure. This can require significant up-front preparation, as it can mean that a change in the structure would be both difficult and disruptive to your whole system.

A **NoSQL database**, on the other hand, has dynamic schema for unstructured data, and data is stored in many ways: it can be column-oriented, document-oriented, graph-based or organized as a Key-Value store. This flexibility means that:

- You can create documents without having to first define their structure
- Each document can have its own unique structure
- The syntax can vary from database to database, and
- You can add fields as you go.

# Introduction to MongoDB

Before we continue working on the OAuth flow of our application, we need to talk about the basics of MongoDB. Once we have MongoDB setup inside of our application, we can make a new user record every time someone uses our application using OAuth. Another library we'll be delving into later on is called Mongoose.js. The sole purpose of Mongoose.js is to make our lives easier when working with MongoDB. It wraps many common operations that we might have to by hand when working with MongoDB.

![alt text](https://github.com/zohaibshahzadTO/TruthTeller/blob/master/assets/detailoauthsignin.JPG)

Lets first discuss how MongoDB internally stores information. Mongo internally stores records into different collections and every different collection that sits inside of our database can have many different records and we can have many different collections. So inside of one MongoDB instance, we might have a collections of users, posts, or payments. Inside of a single collection such as the users collection, we have many different individual records. In the context of a user's collection, we might imagine that every single one of these records represents someone who has signed in or signed up to our application. So we've got one record that represents a user with the name of Anna and another record that represents Alex, Bill and so on. Every record is essentially a little piece of JSON or plain JS object. Every collection is a collection of Key-Value pairs. One of the most important defining characteristics of MongoDB is that fact that it is what we refer to as being schema-less. Every record can have its own very distinct properties. You can see in the diagram, that Anna has a height property and Alex doesn't (it has an age property) and so on. This is in direct contrast to traditional database like SQL (RDBS) that have same properties for every single record.

![alt text](https://github.com/zohaibshahzadTO/TruthTeller/blob/master/assets/mongodb.JPG)

What does Mongoose do for us while working with MongoDB? To represent the collection and record structure that we could be writing in javascript, Express, etc., we're going to have two different concepts that are implemented by Mongoose. By making use the Mongoose library, we make use of something called a model class. A model class created with Mongoose represents an entire MongoDB collection, so the model class is used to access a single collection sitting inside of MongoDB. The model class has a bunch of functions attached to it that are designed to work with an entire collection such as creating a new record or searching all the records inside of our collection is done using a model class. Mongoose also gives us access to something called model instances. Model Instances are javascript objects that represent a single record sitting inside of a collection.

![alt text](https://github.com/zohaibshahzadTO/TruthTeller/blob/master/assets/mongoDB2.JPG)

# MongoDB Setup

![alt text](https://github.com/zohaibshahzadTO/TruthTeller/blob/master/assets/mongo3.JPG)

For this project, we're going to be using an outside or third party service to host a copy of MongoDB for us and on our local computer, we'll continue have our Express API and pretty soon have our react application as well. First, we'll go on **mlab.com**. Sign up and then create a new database and select the following:

- Select **Amazon Web Services** for the Cloud Service and the **Sandbox** for the plan type (Free)
- Select US East (Virginia)(us-east-1) region since its closest on our end

After creating the database, we can click on it and there'll be a few warnings. One of them saying that a database user is required to be connected to this database. To reiterate from before, after all of ours users log into our application, there information will be stored in the **Users** collection.

# Connecting Mongoose to MongoDB

We're now going to install Mongoose into our Express API and instruct Mongoose to connect to the database we had just provisioned. First we'll install mongoose into our application:

```
npm install --save mongoose
```

Then we'll go back to our index.js file and wire mongoose on their as well. Then we're going to instruct mongoose to attempt to connect to that copy of MongoDB that we just provisioned:

```
mongoose.connect() // inside the brackets, we'll plug in the address of the Mongo instance
```

However, we should note that the address to our MongoDB instance is not something we should commit; we don't want other gaining access to our database. So we'll actually store the address to our MongoDB instance in the config folder under **keys.js**. After we'll wire the MongoDB address to our index.js file inside of the **mongoose.connect()** function.

Now let's delve into what Mongoose is doing with MongoDB. So remember, MongoDB itself has a driver layer or a layer of code that lets outside people interact with all the data inside of it. When we run the app in our console, we'll see two warning that being produced by how Mongoose is interacting with MongoDB. Those warnings are being produce by the MongoDB instance because of some code that exists inside of Mongoose. So until Mongoose fixes a few things, there's nothing we can do to get these messages to stop appearing.

![alt text](https://github.com/zohaibshahzadTO/TruthTeller/blob/master/assets/mongo4.JPG)

# Mongoose Model Class

We now are going got use Mongoose to create a new model class which will allow us to create a collection of records inside of our Mongo database. The model class isn't really suited to be in our index.js file since its associated with booting up our application. What we'll do instead is make a new directory in the project.

**Schema**: Note in the last few diagrams pertaining to MongoDB, you're notice that in each record in its collection had distinct properties. However, Mongoose wants to curtail that. It wants to know all of the different properties that our records will have inside of our database. It requires us to define all those ahead of time with this schema object we created in our **User.js** file under **Models**. So when we make use of Mongoose we lose out on the ability to have just a bunch of random different properties on each individual record because Mongoose wants to know ahead of time all the different properties we might have. After we create the schema specifying the properties each user in the Users collection will have, we need to create an actual model class and tell Mongoose that it needs to be aware that this new collection needs to be created. When Mongo boots up and if this collection already exists, its not going to delete it and remake it. It wouldn't overwrite anything; only create if it already does not exist.

# Saving Model Instances

Now that we've got our mongoose model class put together, we can use it to create a new record inside of our users collection anytime a user first signs up to our app. First thing we need to ask ourselves is where we're going to place that logic of ours in the app. When is it appropriate to create this new user? If you recall in our services folder, we have our passport.js file which contains our google strategy and the second argument that google strategy was a callback function that was automatically called anytime a user was redirected back to our application from the Google flow. This callback function has the access token, refreshed token and Google user profile as argument. So this google user profile here contains the google user ID which is the unique identifying token that we want to save into our user record.

NOTE: When dealing with schemas: one argument means you're trying to fetch something from it, two arguments means you're trying to load something into it.

When we now try sign in to our app via google OAuth, you'll see that in our mlabs database that a user collection appears. If we try to access our app via localhost:5000/auth/google, the database will count that as two different users, which is a problem.

# Mongoose Queries

To reiterate, we dont want more than one user record for a particular user in our database when signing into our app. When the user comes back to us from the Google flow and we get access to their profile, before we create a new user, we will check to see if anyone inside of ours users collection already has this given profile ID or the profile ID we just got back from the Google flow. Now when someone does have the same profile ID, then skip user create and don't need to create a new record (will not create a new model instance and wont save it). Otherwise, we'll create a new model instance and save it to the collection.

Whenever we're reaching out to our database, we're making an asynchronous call. Instead simply returning the user ID, the query returns a promise which is a tool that we use with javascript for handling asynchronous code. We'll be using a feature from ES2017 that makes using promises a little nicer. To get an indication when the query is completed, we'll chain on a **.then** statement inside of there and we will add an arrow function and the arrow function will be called whatever user was found. If one exists, we're going to call that the existing user. So this will be a model instance that represents a user who was found. Now if a user has a google ID of profile ID, then the argument existing user right there will be equal to null. So to figure out whether or not we found a user, we want to figure out whether or not **existingUser** exists or not, and so we use an if-else case. If the **existingUser** exists, that means we already have a record with the given profile ID. Else case we don't have a user record with this ID and we want to make a new record. This will fix the problem of duplicating user records for unique ID's.

![alt text](https://github.com/zohaibshahzadTO/TruthTeller/blob/master/assets/mongoose%20queries.JPG)

# Passport Callbacks

After we have finished with user creation or user fetching to tell passport or to tell that strategy that we are all done doing our thing, we have to inform it that we're finished by calling the done callback or the **done function**. This tells passport that we have now finished making this user and it should now resume the authentication process. There are two arguments for the done function. The first argument will be an **err** object. This object communicates back to a passport that maybe something went wrong. Now if we found a user inside of a users collection that means everything went fine. The second argument will be the existing user. For the else case, recall that anytime we save a record to our MongoDB, its an asynchronous operation. We dont want to call the done function until we know for sure that the user has been successfully saved to the database. So in order to get a notification or get something to tell us that the user has been successfully saved to the database, we'll use a **.then** statement.

# Encoding Users

Now that we've been able to successfully save user records into our database. We now need to find a way to take our user model and generate some identifying piece of information and pass it to the user in a cookie that will then be provided in any follow up request back to our server.

# Serializing and Deserializing Users

![alt text](https://github.com/zohaibshahzadTO/TruthTeller/blob/master/assets/MongoDBCookie.JPG)

# Enabling Cookies

We are now ready to tell passport that it needs to make use of cookies to manage authentication inside of our application. Outside of the box, Express has no idea how to handle cookies. We're going to install a helper library called cookies session to manage cookies in our app:

```
npm install --save cookie-session
```

Now we go back to our index.js file and tell Express that it needs to make use of cookies inside of our app. We'll import both the cookie-session library and passport. We have to tell passport to keep track of our user session or our user authentication state by using cookies. We'll do this implementing a function called **app.use**. We're going to pass cookieSession into it and it'll have a configuration object. The first property will be called **maxAge** and expresses how long the cookie will exist inside of the browser before it automatically expires (30 days for us). The second property will be **keys** which will be used to encrypt our cookie. So by default whenever we send out this cookie or this token in the cookie, it will always be 100 automatically encrypted so people cannot manually change the user ID that we're storing in there. We'll then store the keys part of the object into our hidden keys.js file under config folder.

![alt text](https://github.com/zohaibshahzadTO/TruthTeller/blob/master/assets/userid.JPG)

# Testing Authentication

![alt text](https://github.com/zohaibshahzadTO/TruthTeller/blob/master/assets/testauth.JPG)

Upon following the diagram above, we're going to add a third handler so we'll say whenever someone makes a request to our app and we'll give it the route of **/api/current_user**. We're assuming that we might want to have some API route that returns whoever's currently logged into the application. Now the second argument we pass our arrow function through will be automatically called whenever someone makes a request to this route right here. Remember that the arguments for this function are the **req** and **res** objects. Req represents the incoming request and res represents the outgoing response. We're simply going to send back an immediate response which will be **req.user**, so this will test to make sure that someone who has already gone through the OAuth flow and in theory logged into our application can now get access to the user.

When we actually go on **localhost:5000/auth/google** and then sign in, you'll notice a **GET** error. It should initialize our cookie and should kick our user ID into the cookie and then return that cookie the browser. In theory, we now have a cookie tied to our application that identifies me as a very particular user. We'll fix the error in a bit but currently we are considered to be logged in and authenticated to our application.

If we now enter the following URL into the browser:

```
localhost:5000/api/current_user
```

we'll actually receive the user ID as well as the google ID.

# Logging Out Users

We're now going to add a route to handle for logging users out of the application. If we go into our **authRoutes** file, we're going to create another route and say that whenever a user who is authenticated makes a request to the route **/api/logout** we will logout the user from the application. We'll be implementing the method **req.logout()** which will kill the cookie for that particular user and log them out.

# Dev vs Prod Keys

The way our **keys.js** file which contains all of our configuration, API and URI key's, is setup at the moment is going to eventually lead us into some trouble. At present, we have one set of these keys, what we should do is have two separate sets of keys. In the development world such as on our laptops (active dev), we should have one set of keys for MongoDB, Google API, and for all the cookies we're handling and then we should have a completely separate and different set of keys for our production.

Two good reasons for this approach:

- When we use prod key like this, we can store all these keys remotely on heroku servers. All the developer keys can still remain on our personal laptops. Its possible something can happen to our laptop/computers (stolen/lost).

- It also allows us to have two separate Mongo databases. Whenever we deploy our application to production. We want to have a clean database existing in production that has only our users data and we always treat that as pristine data that we will never manually mess around with at any given time. In the development world, if we have a separate database, we can decide to add records, delete records, add/delete/change collections, etc., without having the fear of accidentally breaking all of our users production data.

# Moving Onto the Client Side

Now we'll move onto the client side of the application. First we'll install the following package into our app using our terminal:

```
npm install -g create-react-app
```

after we'll then install the client feature:

```
npx create-react-app client
```

You'll notice that after the installation of react and react client onto the application that there's a separate server now when running the react part of the app. The question now is why not use the Express.js app we already have and implement the React portion on top of it. Well, lets recall that the Express server we already have pulls some information out of MongoDB, then it responds to requests that the browser makes with some amount f JSON or something that says "hey, here's your user model or here's how you go through the OAuth flow, etc". Now the react side of our application is going to eventually take a bunch of different component files. Its then going to spit out a single bundle **.js** file that will be loaded up into the browser. Essentially right now we have one development server for our front-end and one for our back-end handling the route handling and data.

We could absolutely just used one server for this whole application in the beginning, however the **create-react-app** build created by Facebook has so much pre-built configuration already placed into it which would save us time in trying to wire together webpack and babel and the development server.

# Running the Client and Server

In order to run both servers simultaneously, we'll need to install a package that's going to help us run two separate severs with a single command. Just to note, we now have two separate **package.json** files.

Notice we modified the scripts section of the file and added:

```
"dev": "concurrently \"npm run server\" \"npm run client\""
```

That script allows us to run both servers concurrently and we need to install the following library to make it happen:

```
npm install --save concurrently
```

Now if want to run both servers, all we do is go on our terminal or command prompt and enter **npm run dev** which kick off that whole process.
