const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const Url = require('../models/url-model');
const HttpError = require('../models/http-error');
const fetch = require('node-fetch');

// route to shorten the link
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const { keyword } = req.body;
  var { customurl } = req.body;

  const baseUrl = config.get('baseUrl');
  if (customurl === '') {
    const fetch_response = await fetch(
      'https://kutt.it/api/v2/links?apikey=**',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target: longUrl,
          domain: 'dsctiet.tech',
        }),
      },
    );
    const response_json = await fetch_response.json();
    res.send(response_json);
  } else {
    const fetch_response = await fetch(
      'https://kutt.it/api/v2/links?apikey=**',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target: longUrl,
          domain: 'dsctiet.tech',
          customurl: customurl,
        }),
      },
    );
    const response_json = await fetch_response.json();
    res.send(response_json);
  }
});

module.exports = router;
