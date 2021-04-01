App that takes a name and date of birth and returns your age in years, days and hours. Stores these records on a database which you fetch to see all records.  
Back end server that sends an SPA and provides an API to said SPA to perform CRUD operations on docuemnts stored on a database.  

To get the app working do the following.  

Make sure you have Node JS installed, I'm using node version 15.5.0. Go into a terminal and CD into this folder.  
Type into the terminal "npm install" to install all the front end packages.  
Type in your terminal "npm run client-install" to install all your clients development packages.  
Create a ".env" file in the root folder, here you will provide all the environment variables.  
Then provide a number for the SERVER_PORT value for your servers port, then a anumber for your CLIENT_PORT for your front end development servers port.  
Then provide a string for your MONGO_URL that directs to a Mongo database, you can create one and connect to it online with MongoDB Atlas.  
Finally provide a signing key string to your JWT_KEY which will be used to sign tokens.  
Don't use any spaces, here is an example.  
MONGO_URL='mongodb+srv://...'  
PORT=3000  
CLIENTPORT=8080  
JWT_KEY='signingkeyexample'  

If you want to transpile the react code into a bundle to update the application that you'll use in production then type in the terminal "npm run client-build".  

To run the production build type in the terminal "npm run start" and navigate to "http://localhost:" + the PORT value you put in the ".env" file.  

To run this application for development type in your terminal "npm run dev" to run the back end and client server simultaneously, a window/tab should open up automatically in your browser to show you the app.  

type "npm run start" to run server for development.  

type "npm run server" to run server for production.  

type "npm run client-install" to install or the packages on the cliet application.  
    
type "npm run client" to run the client production server.  

type "npm run client-build" to compile the React JSX code into the dist folder.  
    
type "npm run dev" to run both the production server and client production server.  
