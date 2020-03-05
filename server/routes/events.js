const express = require("express");
const { Event } = require("../models/events");
const { authenticate } = require("../middleware/authenticate");

let router = express.Router();

router.get("/", (req, res) => {
  Event.find({}, (err, events) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(events);
  });
});

router.get("/id", (req, res) => {
  let id = req.query.id;

  Event.findOne({ _id: id }, (err, event) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(event);
  });
});
function validate(data) {
  let errors = {};
  if (data.name === "") errors.name = "Missing/Invalid name";
  const invalid = Object.keys(errors).length === 0;
  return errors, invalid;
}
router.post("/", authenticate, (req, res) => {
  const { errors, isValid } = validate(req.body);

  if (!isValid) {
    return res.status(401).send({ err: errors });
  }
  const event = new Event(req.body);

  //res.status(201).json({ success: true });
  Event.findOne({ name: req.body.name }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ err: "Event already exists" });
    }

    event.save(function(err) {
      if (err) {
        if (err) console.log("Error. Cannot save record", err);
        return next(err);
      }
      res.status(200).json({ success: true });
    });
  });
});
router.post("/update", authenticate, (req, res) => {
  let id = req.query.id;
  console.log("updating record", id);

  const { errors, isValid } = validate(req.body);

  // if (!isValid) {
  //   console.log("error", "invalid name");
  //   return res.status(401).json({ success: false, errors });
  // }

  //res.status(201).json({ success: true });
  Event.findOne({ name: req.body.name }, function(err, existingUser) {
    if (err) {
      console.log("error", err);
      return res.status(421).json({ success: false, err });
    }
    if (existingUser) {
      console.log("error", "Event already exists");
      return res.status(422).send({ err: "Event already exists" });
    }
  });

  Event.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err) return res.satus(402).json({ success: false, err });
      res.status(200).json({ success: true });
    }
  );
});
module.exports = { router };
