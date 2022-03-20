const db = require("../models");
const User = db.user;

exports.getData = (req, res) => {
  User.findById(req.params.id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.status(200).send({
        username: user.username,
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastName,
        dateOfBirthday: user.dateOfBirthday,
        sex: user.sex,
        country: user.country,
        city: user.city,
        address: user.address,
        postCode: user.postCode,
        phonePrefix: user.phonePrefix,
        phoneNumber: user.phoneNumber
      });
    }
  });
};

exports.updateData = (req, res) => {
  res.status(200).send("User Content.");
};

exports.deleteData = (req, res) => {
  res.status(200).send("User Content.");
};

// API NOT USED FOR THE MOMENT
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
