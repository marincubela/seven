const express = require('express');
const Racun = require('../models/Racun');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const accounts = await Racun.findAll();

    res.sendStatus({ data: accounts });
  } catch (e) {
    console.log(e);

    res.status(500).json({ error: 'oops!' });
  }
});

module.exports = router;
