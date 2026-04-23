const express = require("express");
const Entry = require("../models/Entry");
const auth = require("../middleware/auth");

const router = express.Router();

function calculateScore({ sleep, stress, study, mood }) {
  let score = 0;

  if (sleep < 6) score += 2;
  if (stress > 7) score += 2;
  if (study > 8) score += 1;
  if (mood < 4) score += 2;

  return score;
}

function getRiskLevel(score) {
  if (score <= 2) return "Low Risk";
  if (score <= 5) return "Moderate Risk";
  return "High Risk";
}

router.post("/", auth, async (req, res) => {
  try {
    const { sleep, stress, study, mood } = req.body;

    if (
      sleep === undefined ||
      stress === undefined ||
      study === undefined ||
      mood === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const score = calculateScore({ sleep, stress, study, mood });
    const riskLevel = getRiskLevel(score);

    const entry = new Entry({
      user: req.user.id,
      sleep,
      stress,
      study,
      mood,
      score,
      riskLevel
    });

    await entry.save();

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Error saving entry" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching entries" });
  }
});

router.get("/weekly", auth, async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const entries = await Entry.find({
      user: req.user.id,
      createdAt: { $gte: sevenDaysAgo }
    }).sort({ createdAt: 1 });

    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weekly entries" });
  }
});

module.exports = router;
