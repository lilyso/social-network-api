const router = require("express").Router();
const userRoutes = require("./api/userRoutes.js");
const thoughtRoutes = require("./api/thoughtRoutes.js");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
