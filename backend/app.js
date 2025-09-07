if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const ExpressError = require('./utils/ExpressError');

const User = require('./models/user');

// Import middleware
const { 
    errorHandler, 
    notFound, 
    requestLogger, 
    securityHeaders,
    corsOptions 
} = require('./middleware');

// Import routes
const userRoutes = require('./routes/users');
const incidentRoutes = require('./routes/incidents');
const geofenceRoutes = require('./routes/geofence');
const alertRoutes = require('./routes/alerts');

// MongoDB connection
const uri = `mongodb+srv://dionysus2359:${process.env.MONGODB_ATLAS_PASS}@cluster0.fiv12j3.mongodb.net/touristsafety?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB connection error:", err));



// Security middleware
app.use(securityHeaders);

// CORS configuration
app.use(cors(corsOptions));

// Request logging
app.use(requestLogger);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

sessionConfig = {
    secret: 'ramram',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.send('Smart Tourist Safety & Incident Response System API is running');
});

// Mount routes
app.use('/users', userRoutes);
app.use('/incidents', incidentRoutes);
app.use('/geofences', geofenceRoutes);
app.use('/alerts', alertRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
});