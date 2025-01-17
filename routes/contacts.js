const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contactController");

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getById);

module.exports = router;
