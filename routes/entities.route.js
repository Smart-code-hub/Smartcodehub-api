const express = require("express");
const path = require("path");
const router = express.Router();
const entityController = require("../controllers/entity.controller");

const { verify } = require("jsonwebtoken");
const { environment } = require("../environment");
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(400).send("Token Required");
  const payLoad = verify(token, environment.secret);

  req.uid = payLoad["_id"];
  next();
};

router
  .route("/")
  .get(authMiddleware, entityController.GetAll)
  .post(authMiddleware, entityController.Create);

router.route("/GetBuUserId").get(authMiddleware, entityController.GetByUser);
router
  .route("/GetResoursesByEntity")
  .post(authMiddleware, entityController.GetResoursesByEntity);

router
  .route("/GetmultipleResourses")
  .post(authMiddleware, entityController.GetmultipleResourses);
router
  .route("/CreateSecureEntitiy")
  .post(authMiddleware, entityController.CreateSecureEntitiy);

router.route("/DeleteAll").post(authMiddleware, entityController.DeleteAll);
router
  .route("/:id")
  .get(authMiddleware, entityController.GetOneById)
  .put(authMiddleware, entityController.UpdateById)
  .delete(authMiddleware, entityController.Delete);

module.exports = router;
