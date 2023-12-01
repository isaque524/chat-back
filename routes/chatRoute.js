const express = require("express");
const { findUserChats, createChat, findChat } = require("../controllers/chatControllers");

const router = express.Router()

router.post("/", createChat);
router.get("/find/:firstId/:secondId", findChat );
router.get("/:userId", findUserChats);

module.exports = router;