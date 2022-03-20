const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/users/:id", [authJwt.verifyToken, authJwt.isUserHeader], controller.getData);

  app.put("/api/v1/users/:id", [authJwt.verifyToken, authJwt.isUserHeader], controller.updateData)

  app.delete("/api/v1/users/:id", [authJwt.verifyToken, authJwt.isUserHeader], controller.deleteData)

  //API NOT USED FOR THE MOMENT
  app.get("/api/v1/users/all", controller.allAccess);

  app.get(
    "/api/v1/users/mod/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/v1/users/admin/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
