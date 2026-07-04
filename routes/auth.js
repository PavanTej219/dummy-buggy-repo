const express = require("express");
const jwt = require("jsonwebtoken");
const { findUserById } = require("../utils/db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-do-not-use-in-prod";

// POST /auth/login
// Body: { userId: number }
// Issues a demo JWT for the given user id (no real password check — demo only).
router.post("/login", (req, res) => {
  const { userId } = req.body;
  const user = findUserById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// GET /auth/me
// Header: Authorization: Bearer <token>
// Decodes the token and returns the current user's profile.
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // BUG: jwt.decode() returns null for an invalid/expired/malformed token,
  // but the code below assumes `decoded` is always an object and reads
  // `decoded.id` straight away — no null-check before use.
  const decoded = jwt.decode(token);
  const user = findUserById(decoded.id); // <-- throws: Cannot read properties of null (reading 'id')

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ user });
});

module.exports = router;
