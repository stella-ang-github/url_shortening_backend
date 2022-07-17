const express = require("express");
const router = express.Router();

const validUrl = require("valid-url");
const validator = require("validator");
const shortId = require("shortid");
const config = require("config");

const Url = require("../models/url");

let urlPatternValidation = (URL) => {
  const regex = new RegExp(
    "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
  );
  return regex.test(URL);
};

//POST: /api/url/createShortenUrl
router.post("/createShortenUrl", async (req, res) => {
  let { actualUrl } = req.query;
  const baseUrl = config.get("baseUrl");

  let urlCode = shortId.generate();

  let existUrlCode = await Url.findOne({ urlCode });

  //Ensure same urlCode do not exist
  while (existUrlCode) {
    urlCode = shortId.generate();
    existUrlCode = await Url.findOne({ urlCode });
  }

  if (!urlPatternValidation(actualUrl)) {
    return res.status(401).json("Invalid URL");
  }

  if (urlPatternValidation(actualUrl)) {
    if (!validUrl.isUri(actualUrl)) {
      actualUrl = "http://" + actualUrl + "/";
    }
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
