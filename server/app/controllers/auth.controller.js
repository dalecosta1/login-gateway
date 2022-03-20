const config = require("../config/auth.config");
const nodemailer = require("../config/nodemailer.config");

const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const token = jwt.sign({ confirmation: `${bcrypt.hashSync(req.body.email, 8)}` }, config.secret);

  Role.findOne({ name: "user" }, (err, role) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirthday: req.body.dateOfBirthday,
      sex: req.body.sex,
      country: req.body.country,
      city: req.body.city,
      address: req.body.address,
      postCode: req.body.postCode,
      phonePrefix: req.body.phonePrefix,
      phoneNumber: req.body.phoneNumber,
      confirmationCode: token,
      roles: [role._id],
      createdAt: new Date()
    });

    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({
        message:
          "User was registered successfully! Please check your email (also inside the spam).",
      });
  
      nodemailer.sendConfirmationEmail(
        (user.firstName + " " + user.lastName),
        user.email,
        user.confirmationCode
      );
    });
  });
};

exports.signin = (req, res) => {

  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      if (user.status !== "Active") {
        return res.status(401).send({
          message: "Pending Account. Please Verify Your Email!",
        });
      }

      var token = jwt.sign({ data0: `${bcrypt.hashSync(user.id)}` }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
        status: user.status,
      });
    });
};

exports.verifyUser = (req, res, next) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      //console.log(user);
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      } else {
        if (user.status === "Active") {
          return res.status(200).send({ message: "User has been already activated." });
        } else {
          user.status = "Active";
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
          });
          return res.status(200).send({ message: "User activated correctly." });
        }        
      }
    })
    .catch((e) => console.log("error", e));
};
