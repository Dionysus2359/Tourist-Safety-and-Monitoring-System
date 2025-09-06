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

const uri = `mongodb+srv://dionysus2359:${process.env.MONGODB_ATLAS_PASS}@cluster0.fiv12j3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            console.log("Connected to MongoDB successfully!");
        });
    } finally {
        // Ensures that the client will close when you finish/error
        await mongoose.disconnect();
    }
}
run().catch(console.dir);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));
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
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.send('API is running');
});

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh no, Something went wrong!"
    res.status(statusCode).json({ error: err.message });
});

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
});