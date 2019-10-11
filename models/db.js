var mongoose = require( 'mongoose' );
require('./program')

// Mongoose connection
var dbURI = "mongodb+srv://Imal:pass123@fitnessworkout-ootjq.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true });

// Check connection
mongoose.connection.on('connected', () => { 
    console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err); 
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2'); 
  });
});

// app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

// Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0); 
  });
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};