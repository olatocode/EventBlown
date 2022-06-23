/** @format */
const express = require('express');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./utils/keys');
const authRoutes = require('./routes/auth.route');
const profileRoutes = require('./routes/profile.route');
const userRouter = require('./routes/user.route');
const adminRouter = require('./routes/admin.route');
const eventRouter = require('./routes/event.route');
const eventBookingRouter = require('./routes/eventBooking.route');

dotenv.config();
const app = express();

app.use(express.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');

const connect_MongoDB = require('./database/mongodb');
const connect_PostgresDB = require('./database/postgresdb');
const { PORT } = process.env;

// google home page
app.get('/auth', (req, res) => {
  res.render('home', { user: req.user });
});
// home page
app.get('/', (req, res) => {
  res.send('Welcome To Event Blown App');
});

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookie_key],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/api/v1', userRouter);
app.use('/api/v1', adminRouter);
app.use('/api/v1', eventRouter);
app.use('/api/v1', eventBookingRouter);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Connect Database
connect_MongoDB;
connect_PostgresDB;
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`EventBlown is running on port ${PORT}`);
});
