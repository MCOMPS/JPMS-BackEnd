const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');


const { auth, requiresAuth  } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'AtQbxYsL6VtlUzPcHh0MISrs1v0tVyr4',
  issuerBaseURL: 'https://dev-ujgbqo3g6lnrqj2w.us.auth0.com'
};

require('dotenv').config();

const middlewares = require('./middlewares');
// const api = require('./routes');
const mountRoutes = require('./routes');


const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello this is the Aljazeera Properties API',
//   });
// });

const notConnected = {
  status: "Not Logged in",
  message: "You're not authorized to access this Endpoint, Please Log in first"
};

const connected = {
  status: "Logged in",
  message: "This is a protected API that you can only view if logged in"
}


app.get('/callback', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "logged in" : "Not Logged in");
})

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

mountRoutes(app);

// app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


module.exports = app;
