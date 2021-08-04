const Court = require('../modules/court');


// Function to handle Errors 
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        name: '',
        courtType: '',
        sport: '',
        website: '',
        email: '',
        address : '',
        phoneNumber: '',
        type: '',
        numberOfCourt: '',
        price: '',
        onlineBooking: '',
        rentingInventory: '',
        coaches: '',
        startingHour: '',
        endingHour: ''
    };

    if (err.message.includes('court validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    
    return errors;
    
}

// Get the list of Courts

const courtsList = (req, res, next) => {
    Court.find({}).then(function(courts){
        res.send(courts);
    });
}

// Get a court by [City & Sport]

const getCourt = (req, res, next) => {
    
    
    Court.aggregate([
        {
            $match: { 
                "city": req.params.city,
                "sport":req.params.sport
            }
        },
        {
            $lookup: {
                from: "bookings",
                localField: "_id",
                foreignField: "court",
                as: "booking_docs"
            }
        },
        {
            $project: {
                "city":1,
                "sport":1,
                "name":1,
                "address": 1,
                "type":1,
                "courtType":1,
                "price":1,
                "booking_docs": {
                    $filter: {
                        input: "$booking_docs",
                        as : "booking_doc",
                        cond: {
                            $and: [
                                {$lt: ["$$booking_doc.bookingStartTime"  , {$dateFromString: { dateString: req.params.bookingEndTime}}]},
                                {$gt: ["$$booking_doc.bookingEndTime" , {$dateFromString: { dateString: req.params.bookingStartTime}}]}
                            ]
                        }
                    }    
                }
            }
        },
    ])
    .then((courts) => {
        var listofcourts = {};
        courts.forEach( (court,index) => {
            if( Object.entries(court.booking_docs).length === 0 ){
                var id = "courtid" + index
                var name = "courtName"
                var city = "courtCity"
                var sport = "sport" 
                var address = "address"
                var type = "Type"
                var courtType = "courtType"
                var price = "price"
                listofcourts[id] = court._id;
                listofcourts[name] = court.name;
                listofcourts[city] = court.city;
                listofcourts[sport] = court.sport;
                listofcourts[address] = court.address;
                listofcourts[type] = court.type;
                listofcourts[courtType] = court.courtType;
                listofcourts[price] = court.price;
            }
        })
        console.log(listofcourts);
        res.send(listofcourts);

    })
}

//Add a new court to the DB
// Here if we get an error, we gonna call the next middleware (which is the error handling middleware) 
const addCourt = (req, res, next) => {
    // This mongoose method will create an instance of Court and save it and the DB
    Court.create(req.body)
    .then((court) => {
        res.send(court);
    })
    .catch(err => {
        const errors = handleErrors(err);
        res.status(401).json({errors});
    });
}

// Update a court in the DB
const updateCourt = (req, res, next) => {
    Court.findByIdAndUpdate({_id:req.params.id}, req.body)
    .then(() => {
        Court
        .findOne({_id: req.params.id})
        .then( (court) => {
            res.send(court);
        });
    });
}

// Delete a court from the DB
const deleteCourt = (req, res, next) => {
    Court.findByIdAndRemove({_id: req.params.id})
    .then((court) => {
        res.send(court);
    })
}

module.exports = {
    courtsList, 
    getCourt,
    addCourt , 
    updateCourt , 
    deleteCourt
};
