const express = require("express");
const router = express.Router();

const validator = require("validator");
const shortId = require("shortid");
const config = require("config");

const Url = require("../models/url");

//POST: /api/url/createShortenUrl
router.post("/createShortenUrl", async (req, res) => {
  const { actualUrl } = req.query;
  const baseUrl = config.get("baseUrl");

  let urlCode = shortId.generate();

  let existUrlCode = await Url.findOne({ urlCode });

  //Ensure same urlCode do not exist
  while (existUrlCode) {
    urlCode = shortId.generate();
    existUrlCode = await Url.findOne({ urlCode });
  }

  if (validator.isURL(actualUrl)) {
    try {
      const shortUrl = baseUrl + "/" + urlCode;

      const url = new Url({
        urlCode,
        actualUrl,
        shortUrl,
      });

      await url.save();

      res.json(url);
    } catch (err) {
      console.error(err);
      res.status(500).json("Internal server error");
    }
  } else {
    res.status(401).json("Invalid URL");
  }
});

module.exports = router;
