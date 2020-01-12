
const app = require("./lib/server/server");


const HOST = "http://127.0.0.1";
const PORT = process.env.PORT || 8080;

//set up server
app.listen(PORT, ()=>console.log(`Server listening on: ${HOST}:${PORT}`));






// To terminate db connection before application exit
// ref: https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits

// prevent app from closing instantly
process.stdin.resume();

function exitHandler(options, exitCode) {
    // for every instances where applicaiton is restarted or exited,
    // termniate the database connection.
    console.log("Terminating databse connection...");
    connecction.end();
    if (options.cleanup) console.log('clean');
    if(exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) {
        console.log("Exiting the application.");
        process.exit();
    }
}

// when application is exiting..
process.on("exit", exitHandler.bind(null, {cleanup:true}));

// catch ctrl+c event
process.on("exit", exitHandler.bind(null,  {exit:true}));

// catches "kill pid" e.g nodemon restart
process.on("SIGUSR1", exitHandler.bind(null,  {exit:true}));
process.on("SIGUSR2", exitHandler.bind(null,  {exit:true}));

// uncaught exception events
process.on("uncaughtException", exitHandler.bind(null,  {exit:true}));