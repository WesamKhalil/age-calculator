App that takes a name and date of birth and returns your age in years, days and hours. Stores these records on a database which you fetch to see all records.
Back end server that sends an SPA and provides an API to said SPA to perform CRUD operations on docuemnts stored on a database.

Make sure to install all node packages for the back end by typing in the terminal "npm install".
And install all packages for the client application by typing "npm run client-install".
Create an .env file to store all your process variables.
You need a link to MongoDB and store it in the .env file, store it in the MONGOURL variable, you can easily set up MongoDB by going online to MongoDB atlas and copying and pasting the link into the .env MONGOURL variable.
In that same .env file set the port for your server with the PORT variable and the clients development server with the CLIENTPORT variable.

type "npm run start" to run server for development.

type "npm run server" to run server for production.

type "npm run client-install" to install or the packages on the cliet application.
    
type "npm run client" to run the client production server.

type "npm run client-build" to compile the React JSX code into the dist folder.
    
type "npm run dev" to run both the production server and client production server.
