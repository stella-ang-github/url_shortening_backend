const express = require("express");
const router = express.Router();

const Url = require("../models/url");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/:urlCode", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.urlCode });

    if (url) {
      return res.redirect(url.actualUrl);
    } else {
      return res.status(404).json("URL not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error.");
  }
});

module.exports = router;
