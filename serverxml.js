var arr = [
    {
        name: "raza",
        email: "raza@gmail.com",
        password: "1234",
    }
]

let express = require("express")
let cors = require("cors");
bodyParser = require('body-parser');
var morgan = require("morgan");
const mongoose = require("mongoose");
var bcrypt = require("bcrypt-inzi")

/////////////////////////////////////////////////////////////////////////////////////////////////
// let dbURI = "mongodb+srv://dbuser:dbpassword@cluster0.9qvbs.mongodb.net/abc-database";
let dbURI = "mongodb+srv://faiz:2468@mundodb.lkd4g.mongodb.net/ttest?retryWrites=true&w=majority";
// let dbURI = 'mongodb://localhost:27017/abc-database';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////



var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    gender: String,
    createdOn: { type: Date, 'default': Date.now },
    activeSince: Date,
});

var getUser = mongoose.model("users", userSchema);
module.export = getUser


let appxml = express()
var PORT = process.env.PORT || 3001
appxml.use(cors());
appxml.use(bodyParser.json());
appxml.use(bodyParser.urlencoded({ extended: true }));
appxml.use(morgan('dev'));

// =========================>

// appxml.post('/', (req, res, next) => {

//     console.log(arr);

//     let found = false;
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].email === req.body.email) {
//             found = true;
//             // res.send("email already exists");
//             break;
//         }
//     }
//     if (found) {
//         res.send({
//             message: "email alredy access",
//             status: 400
//         });

//     }
//     else {
//         res.send({
//             message: "Signed up succesfully",
//             status: 200
//         });
//         arr.push(req.body);
//         console.log(req.body);
//     }
// })
// =========================>


// ==========================================>CreatE UseR Start /////

appxml.post("/signup", (req, res, next) => {

    if (!req.body.name || !req.body.email || !req.body.password) {

        res.status(403).send(`
            please send name, email, passwod, phone and gender in json body.
            e.g:
            {
                "name": "malik",
                "email": "Razamalika@gmail.com",
                "password": "abc",
                "phone": "03000000000",
                "gender": "Male"
            }`)
        return;
    }
    getUser.findOne({ email: req.body.email },
        function (err, Doc) {
            if (!err && !Doc) {

                bcrypt.stringToHash(req.body.password).then(function (hash) {
                    var newUser = new getUser({
                        "name": req.body.name,
                        "email": req.body.email,
                        "password": hash,
                        // "phone": req.body.phone,
                        // "gender": req.body.gender,
                    })


                    newUser.save((err, data) => {
                        if (!err) {
                            res.send({ message: "user created" })
                            //  status: 200

                        } else {
                            console.log(err);
                            res.status(500).send("user create error, " + err)
                        }
                    })
                })

            } else if (err) {
                res.status(500).send({
                    message: "db error"
                })
            } else {
                res.status(409).send({
                    message: "user alredy access"
                })
            }

        }
    )
})

// ==========================================>C5reat User COmplet $$

// ==========================================>Start LOgin /////



appxml.post('/login', (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(403).send(
            `please send email and passwod in json body.
            e.g:
             {
            "email": "malikasinger@gmail.com",
            "password": "abc",
         }`)
         return;
    } 
    getUser.findOne({ email: req.body.email},
        function (err,user){
            if (err) {
                res.status(500).send({message:"an error accure"})
            } else if(user){
                bcrypt.varifyHash(req.body.password,user.password).then(result => {
                    if (result) {
                        console.log("matched");
                    } else {
                        console.log("not matched");
                    }
                })
            }
        }
        )


})
// appxml.post('/login', (req, res, next) => {

//     var flag = false;
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].email === req.body.email) {

//             flag = i;
//             break;
//         }
//     }
//     if (flag === false) {

//         res.send({
//             message: "do not match email",
//             status: 400
//         })
//     } else if (arr[flag].password === req.body.password) {

//         res.send({
//             message: "Sin in Success Full",
//             status: 200,

//         })

//     } else {
//         res.send({
//             message: "do not match PAssword",
//             status: 400,
//         })
//     }
// })
// ==========================================>C5reat Login COmplet $$ /////

// ==========================================>Server /////
appxml.listen(PORT, () => {
    console.log("chal gya hai server", PORT)
})
// ==========================================>Server End/////

// appxml.get('/signup', (req, res, next) => {
//     getUser.find({}, function (err, users) {

//         // loop user
//         // match username password

//         // if match send loginn success
//         res.send("login success")
//         // else login fail



//     });
// });


// var newUser = new getUser({
//     "name": req.body.name,
//     "email": req.body.email,
//     "password": req.body.password,
//     // "phone": req.body.phone,
//     // "gender": req.body.gender,
// })

// userModel

// var getUser = mongoose.model("users", userSchema);
// module.export=getUser


// appxml.post('/signup', (req, res, next) => {

//     console.log(arr);

//     let found = false;
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].email === req.body.email) {
//             found = true;
//             // res.send("email already exists");
//             break;
//         }
//     }
//     if (found) {
//         res.send({
//             message: "email alredy access",
//             status: 400
//         });

//     }
//     else {
//         res.send({
//             message: "Signed up succesfully",
//             status: 200
//         });
//         arr.push(req.body);
//         console.log(req.body);
//     }
// })


