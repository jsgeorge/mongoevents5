const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const bcrypt = require("bcrypt");
// const jwt = require("jwt-simple");
// const config = require("./config");

//Routes
const users = require("./routes/users");
const auth = require("./routes/auth");
const events = require("./routes/events");
const categories = require("./routes/categories");
const settings = require("./routes/settings");

const app = express();

//mongo DB
mongoose.connect(
  "mongodb://localhost:27017/auth" || "mongodb://localhost/react/auth"
);

app.use(bodyParser.json());

//Routes middleware
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/events", events);
app.use("/api/events/byCity", events);
app.use("/api/events/id", events);
app.use("/api/events/update", events);
app.use("/api/categories", categories);
app.use("/api/settings", settings);
app.use("/api/settings/chgDefaultCity", settings);

//Models
// const { User } = require("./models/users");
// const { Event } = require("./models/events");
// const { Category } = require("./models/categories");

//Middlewre
// const { authenticate } = require("./middleware/authenticate");

//------------------------------
//Users Route
//------------------------------
// function tokenForUser(user) {
//   const timestamp = new Date().getTime();
//   return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
// }

// app.post("/api/users", (req, res) => {
//   const { email, password, username, timezone } = req.body;
//   const password_digest = bcrypt.hashSync(password, 10);
//   const user = new User({
//     email: email,
//     password: password_digest,
//     username: username,
//     timezone: timezone
//   });

//   User.findOne({ email: email }, function(err, existingUser) {
//     if (err) {
//       return next(err);
//     }
//     if (existingUser) {
//       return res.status(422).send({ err: "Email already in use" });
//     }

//     user.save(function(err) {
//       if (err) {
//         return next(err);
//       }
//       res.json({
//         token: tokenForUser(user)
//       });
//     });
//   });
// });

// app.get("/api/users", (req, res) => {
//   User.find({}, (err, users) => {
//     if (err) return res.status(400).send(err);
//     return res.status(200).send(users);
//   });
// });
// //---------------------------------
// //Auth Route
// //------------------------------
// function tokenForUser(user) {
//   const timestamp = new Date().getTime();
//   return jwt.encode({ id: user.id, username: user.username }, config.secret);
//   // return jwt.sign(
//   //   {
//   //     id: user.id,
//   //     username: user.username
//   //   },
//   //   config.secret
//   // );
// }

// app.post("/api/auth", (req, res) => {
//   const { identifier, password } = req.body;
//   User.findOne({ email: identifier }, (err, user) => {
//     if (!user)
//       return res.json({
//         loginSuccess: false,
//         message: "Auth failed, email not found"
//       });
//     user.comparePassword(password, (err, isMatch) => {
//       if (!isMatch)
//         return res.json({
//           loginSuccess: false,
//           message: "Wrong password"
//         });

//       res.status(200).json({
//         token: tokenForUser(user)
//       });
//     });
//   });
// });

// //--------------------------------
// //Events Route
// //---------------------------------
// app.get("/api/events/byCity", (req, res) => {
//   let city = req.query.city;
//   console.log(city);
//   Event.find({ city: city }, (err, events) => {
//     if (err) return res.status(400).send(err);
//     return res.status(200).send(events);
//   });
// });

// app.get("/api/events/id", (req, res) => {
//   let id = req.query.id;

//   Event.findOne({ _id: id }, (err, event) => {
//     if (err) return res.status(400).send(err);
//     return res.status(200).send(event);
//   });
// });
// function validate(data) {
//   let errors = {};
//   if (data.name === "") errors.name = "Missing/Invalid name";
//   const invalid = Object.keys(errors).length === 0;
//   return errors, invalid;
// }
// app.post("/api/events", authenticate, (req, res) => {
//   //const { errors, isValid } = validate(req.body);

//   // if (!isValid) {
//   //   return res.status(401).send({ errors });
//   // }
//   console.log(req.body);
//   const event = new Event(req.body);

//   //res.status(201).json({ success: true });
//   Event.findOne(
//     {
//       location: req.body.location,
//       eventDate: req.body.eventDate,
//       eventTime: req.body.eventTime
//     },
//     function(err, exEvent) {
//       if (err) {
//         return res.status(401).send({ err });
//       }
//       if (exEvent) {
//         return res.status(422).send({ err: "Event already exists" });
//       }

//       event.save(function(err) {
//         if (err) {
//           return res.status(401).send({ err: err });
//         }
//         res
//           .status(200)
//           .send({ success: true })
//           .json(event);
//       });
//     }
//   );
// });
// app.post("/api/events/update", authenticate, (req, res) => {
//   let id = req.query.id;
//   console.log("updating record", id);

//   const { errors, isValid } = validate(req.body);

//   // if (!isValid) {
//   //   console.log("error", "invalid name");
//   //   return res.status(401).json({ success: false, errors });
//   // }

//   //res.status(201).json({ success: true });
//   Event.findOne(
//     {
//       location: req.body.location,
//       eventDate: req.body.eventDate,
//       eventTime: req.body.eventTime
//     },
//     function(err, exEvent) {
//       if (err) {
//         console.log("error", err);
//         return res.status(421).json({ success: false, err });
//       }
//       if (exEvent) {
//         console.log("error", "Event already exists");
//         return res.status(422).send({ err: "Event already exists" });
//       }
//     }
//   );

//   Event.findOneAndUpdate(
//     { _id: id },
//     { $set: req.body },
//     { new: true },
//     (err, doc) => {
//       if (err) return res.satus(402).json({ success: false, err });
//       res.status(200).json({ success: true });
//     }
//   );
// });
// //--------------------------------------
// //Categories
// app.get("/api/categories", (req, res) => {
//   Category.find({}, (err, categories) => {
//     if (err) return res.status(400).send(err);
//     return res.status(200).send(categories);
//   });
// });

//----------------------------
const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
