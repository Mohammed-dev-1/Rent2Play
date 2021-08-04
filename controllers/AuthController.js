const config = require("../config/auth.config");
const User = require("../modules/user");
const Role = require("../modules/role");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const register = (req, res, next) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        age: req.body.age,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    
    user.save((err, user) => {
        if(err) {
            res.status(500).send({ 
                message: err
            });
            return;
        }

        if(req.body.category && req.body.isAdmin) {
            // Search for what is role user have registered
            Role.find({
                category: {
                    $in: req.body.category
                },
                isAdmin: {
                    $in: req.body.isAdmin
                }
            },
            (err, roles) => {
                if(err) {
                    res.status(500).send({
                        message: err
                    });
                    return;
                }
                // Set role id to user
                user.roles = roles.map(id => id._id);

                // This for set user role 
                var authorities = {
                    UserCategory: req.body.category,
                    UserIsAdmin: req.body.isAdmin
                };

                // create token for 1 day (24h*60d*60s = 86400s)
                var token = jwt.sign(
                    { id: user.id }, 
                    config.secret, 
                    { expiresIn: 86400 }
                );

                user.save(err => {
                    if(err) {
                        res.status(500).send({
                            message: err
                        });
                        return;
                    }

                    res.status(200).send({
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        roles: authorities,
                        accessToken: token, 
                        message: "User was registered successfully!"
                    });
                })
            })
        } else {
            Role.findOne({
                category: "Amateur",
                isAdmin: false
            },
            (err, role) => {
                if(err) {
                    res.status(500).send({ 
                        message: err
                    });
                    return;
                }

                user.roles = [role._id];
                
                // This for set user role 
                var authorities = {
                    UserCategory: req.body.category,
                    UserIsAdmin: req.body.isAdmin
                };

                // create token for 1 day (24h*60d*60s = 86400s)
                var token = jwt.sign(
                    { id: user.id }, 
                    config.secret, 
                    { expiresIn: 86400 }
                );

                user.save(err => {
                    if(err) {
                        res.status(500).send({
                            message: err
                        });
                        return;
                    }
                    res.send({
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        roles: authorities,
                        accessToken: token, 
                        message: "User was registered successfully!"
                    })
                })
            })
        }
    })
}



const logIn = (req, res, next) => {
    User.findOne(
        {
          email: req.body.email  
        },
        (err, user) => {
            if(err) {
                res.status(500).send({
                    message: "err 1 500"
                });
                return;
            }

            if(!user) {
                return res.status(404).send({
                    message: "User not found!"
                })
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if(!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            // create token for 1 day (24h*60d*60s = 86400s)
            var tokenUse = jwt.sign(
                { id: user.id }, 
                config.secret, 
                { expiresIn: 86400 }
            );

            Role.findOne(
                {
                    _id: user.roles[0]
                },
                (err, role) => {
                    if(err) {
                        res.status(404).send({
                            message: "User role not found!"
                        });
                        return;
                    }

                    var userRoles = {
                        category: role.category,
                        isAdmin: role.isAdmin
                    }

                    res.status(200).send({
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        roles: userRoles,
                        accessToken: tokenUse, 
                        message: "User was registered successfully!"
                    })
                }
            )
        }
    )
}



// Handle Errors 
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        age: '',
        category: ''
    };

    // Handle the repeated email
    if (err.code === 11000){
        errors.email = 'That email is already used';
        return errors;
    }

    // Validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}


// Login function : The user could login using the email and phone number
// const login = (req, res, next) => {
//     var username = req.body.username;
//     var password = req.body.password;
    

//     User.findOne({$or: [{email: username}, {phoneNumber: username}]})
//     .then(user => {
//         if (user) {
//             bcrypt.compare(password, user.password, function(err, result){
//                 if (err) {
//                     res.json({
//                         title: 'Server error',
//                         error: err
//                     })
//                     console.log('err');
//                 }if (result){
//                     let token = jwt.sign({name: user.firstName}, 'verySecretValue')
//                     return res.status(200).json({
//                         title: 'Login successfull'
//                     })
                    
//                 }else{
//                     return res.status(401).json({
//                         title: 'password wrong',
//                         error: 'invalid credentials'
//                     })
//                 }
//             })
//         }
//         else {
//             return res.status(401).json({
//                 title: 'password wrong',
//                 error: 'invalid credentials'
//             })   
//         }
//     })

// }

module.exports = {
    register,
    logIn
}