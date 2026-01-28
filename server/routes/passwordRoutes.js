const express = require("express");
const zxcvbn = require("zxcvbn");
const fs = require("fs");
const hashPassword = require("../utils/hash");

const router = express.Router();

router.post("/check", (req, res) => {
  const { password } = req.body;

  // strength check
  const result = zxcvbn(password);

  // hash password
  const hashed = hashPassword(password);

  // read leaked hashes
  const leakedList = fs
    .readFileSync("data/leaked.txt", "utf-8")
    .split("\n")
    .map(line => line.trim());
    
  const isLeaked = leakedList.includes(hashed);

  res.json({
    score: result.score,
    suggestions: result.feedback.suggestions,
    leaked: isLeaked,
  });
});

module.exports = router;