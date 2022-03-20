const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  token = token.replace("Bearer ","");
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.data0 = decoded.data0;
    next();
  });
};

isUserHeader = (req, res, next) => {
  //console.log("param id = " + req.params.id);
  //console.log("param id encrypted = " + req.data0);
  var idValid = bcrypt.compareSync(
    req.params.id,
    req.data0
  );
  if (!idValid) {
    res.status(401).send({ message: "Unauthorized!" });
    return;
  }
  //console.log("user confirmed = " + idValid);
  User.findById(req.params.id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      //console.log("it's all okay");
      next();
      return;
    }
  });
};

isUserBody = (req, res, next) => {
  //console.log(req)
  var idValid = bcrypt.compareSync(
    req.params.id,
    req.data0
  );
  if (!idValid) {
    res.status(401).send({ message: "Unauthorized!" });
    return;
  }
  User.findById(req.params.id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      next();
      return;
    }
  });
};

isAdmin = (req, res, next) => {
  //console.log(req)
  var idValid = bcrypt.compareSync(
    req.params.id,
    req.data0
  );
  if (!idValid)
  {
    res.status(401).send({ message: "Unauthorized!" });
    return;
  }
  User.findById(req.params.id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    try {
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Admin Role!" });
          return;
        }
      );
    } catch (error) {
      // if the user has not the role admin, 
      // the code will break... So return 403 Require admin role!
      res.status(403).send({ message: "Require Admin Role!" });
      return;
    }
  });
};

isModerator = (req, res, next) => {
  var idValid = bcrypt.compareSync(
    req.params.id,
    req.data0
  );
  if (!idValid)
  {
    res.status(401).send({ message: "Unauthorized!" });
    return;
  }
  User.findById(req.params.id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    try {
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Moderator Role!" });
          return;
        }
      );
    } catch (error) {
      // if the user has not the role moderator, 
      // the code will break... So return 403 Require moderator role!
      res.status(403).send({ message: "Require Moderator Role!" });
      return;
    }

  });
};

const authJwt = {
  verifyToken,
  isUserHeader,
  isUserBody,
  isAdmin,
  isModerator
};
module.exports = authJwt;
