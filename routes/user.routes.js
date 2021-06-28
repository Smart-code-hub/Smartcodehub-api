const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router
  .route("/")
  .get(userController.GetAll)
  .post(userController.Create);

router.route("/verify/:id/:randomString").get(userController.verifyUserEmail);
router.route("/resendEmail/:email").get(userController.resendEmail);
router
  .route("/:id")
  .get(userController.GetOneById)
  .put(userController.UpdateById)
  .delete(userController.Delete);

router.route("/login").post(userController.Authenticate);

module.exports = router;
