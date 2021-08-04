const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const AuthRoute = require('./routes/auth')
const CourtRoute = require('./routes/courtApi')
const CoachRoute = require('./routes/coachApi')
const ShopRoute = require('./routes/shopApi')
const BookingRoute = require('./routes/bookingApi')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const dotenv = require('dotenv');

// Load env
dotenv.config({path : './config.env'});

// set express app
const app = express();

app.use(cors());


// Connect to MongoDB
mongoose.connect('mongodb://localhost/rent2play', { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database connected");
    initial();
})
.catch(error => 
    console.error("Could not connect to mongo db ", error)
);

mongoose.Promise = global.Promise;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Initialize routes
app.use('/api', CourtRoute);
app.use ('/api', CoachRoute);
app.use('/api', ShopRoute);
app.use('/payment', BookingRoute)
app.use('/api', AuthRoute);

//Error handling middleware
app.use(function(err, req, res, next){
    res.status(404).send({
        error: err.message
    })
    .end();
})

//Handle production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static(`${__dirname}/public/`));

    // Hnadle SPA
    app.get(/.*/, (req,res) => {
        res.sendFile(`${__dirname}/public/index.html`)
    })
}

// Listen for request
const port = process.env.port || 4000;

app.listen(port, ()=> {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});


const Role = require("./modules/role");
const initial = () => {
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count === 0) {
            new Role({
                category: "Pro",
                isAdmin: true
            })
            .save(err => {
                if(err) {
                    console.log("error", err)
                }

                console.log("added 'Pro and admin true' to roles collections")
            });

            new Role({
                category: "Pro",
                isAdmin: false
            })
            .save(err => {
                if(err) {
                    console.log("error", err)
                }

                console.log("added 'Pro and admin false' to roles collections")
            });

            new Role({
                category: "Amateur",
                isAdmin: true
            })
            .save(err => {
                if(err) {
                    console.log("error", err)
                }

                console.log("added 'Amateur and admin true' to roles collections")
            });

            new Role({
                category: "Amateur",
                isAdmin: false
            })
            .save(err => {
                if(err) {
                    console.log("error", err)
                }

                console.log("added 'Amateur and admin false' to roles collections")
            });
        }
    });
}