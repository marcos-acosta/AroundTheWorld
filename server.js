// Express
const express = require("express");
const session = require("express-session");
const cors = require('cors');
// Mongoose (to connect to MongoDB)
const mongoose = require("mongoose");
const connectStore = require("connect-mongo");
// Parse HTTP requests
const bodyParser = require("body-parser");
const users = require("./routes/users");
const bottles = require("./routes/bottles");
const sessions = require('./routes/session');
const app = express();
// CORS
app.use(cors());
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
const config = require("./config/config.js");
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const MongoStore = connectStore(session);

app.use(session({
  name: config.SESS_NAME,
  secret: config.SESS_SECRET,
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'session',
    ttl: parseInt(config.SESS_LIFETIME) / 1000
  }),
  cookie: {
    sameSite: true,
    secure: config.NODE_ENV === 'production', // This might be the cause of your issues
    maxAge: parseInt(config.SESS_LIFETIME)
  }
}));

// PASSPORT STUFF  
/*
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
*/

// Routes
const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use('/users', users);
apiRouter.use('/bottles', bottles);
apiRouter.use('/session', sessions);

// app.use("/api/users", users);
// app.use("/api/bottles", bottles);

const port = process.env.PORT || config.PORT; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));