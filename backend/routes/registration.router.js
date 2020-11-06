const express = require('express');
const router = express.Router();
const Racun = require('../models/Racun');
const Klijent = require('../models/Klijent');
const Tvrtka = require('../models/Tvrtka');
const { body } = require('express-validator');
const { hashPassword } = require('../utils/password');

// Will create a Racun model
const createAccount = async (id, email, oib, admin, password) => {
  const user = await Racun.create({
    id: id,
    email: email,
    OIB: oib,
    admin: admin,
    lozinka: await hashPassword(password),
  });
  return user;
};

//Will create a Tvrtka model
const createCompany = (accountData) => {};

//Will create a Klijent model
const createClient = async (id, name, surname, number) => {
  const client = await Klijent.create({
    idKlijent: id,
    prezime: surname,
    ime: name,
    brojKartice: number,
  });
};

let emailCheck = async (email) => {
  const emailCheck = await Racun.findOne({
    where: {
      email,
    },
  });

  if (emailCheck) {
    return false;
  }
  return true;
};

let oibCheck = async (oib) => {
  const oibCheck = await Racun.findOne({
    where: {
      OIB: oib,
    },
  });

  if (oibCheck) {
    return false;
  }
  return true;
};

let cardNumberCheck = async (number) => {
  const cardCheck = await Klijent.findOne({
    where: {
      brojKartice: number,
    },
  });

  if (cardCheck) {
    return false;
  }
  return true;
};

let getUserId = async () => {
  return 1 + (await Klijent.count());
};

// Will create a Klijent accountđ
router.post(
  '/user',
  [
    // email field needs to be an email
    body('data.email').isEmail(),

    // password field is required
    body('data.password').not().isEmpty(),

    // OIB field length must be 11
    body('data.OIB').isLength({ min: 11, max: 11 }).isNumeric(),

    // Name field must consists of letters
    body('data.firstname').isAlpha(),

    // Surname field must consists of letters
    body('data.lastname').isAlpha(),

    // Credit card must consists of 16 numbers
    body('data.creditCard').isLength({ min: 16, max: 16 }).isNumeric(),
  ],

  //Checks if email alredy exists
  async (req, res, next) => {
    const email = req.body.data.email;
    if (!(await emailCheck(email))) {
      return res.status(400).json({
        error: {
          message: 'Klijent s tim emailom već postoji',
        },
      });
    }

    const oib = req.body.data.oib;
    if (!(await oibCheck(oib))) {
      return res.status(400).json({
        error: {
          message: 'Klijent s tim OIB-om već postoji',
        },
      });
    }

    const number = req.body.data.number;
    if (!(await cardNumberCheck(number))) {
      return res.status(400).json({
        error: {
          message: 'Klijent s tom karticom već postoji',
        },
      });
    }
    const name = req.body.data.name;
    const surname = req.body.data.surname;
    const id = await getUserId();
    var user = await createAccount(
      id,
      email,
      oib,
      false,
      req.body.data.password
    );
    await createClient(id, name, surname, number);

    req.session.user = {
      id: user.id,
      email: user.email,
      admin: user.admin,
    };

    return res.status(200).json({
      data: {
        user: req.session.user,
      },
    });
  }
);

// Will create a Tvrtka account
router.post(
  '/company',
  [
    // email field needs to be an email
    body('data.email').isEmail(),

    // password field is required
    body('data.password').not().isEmpty(),

    // OIB field length must be 11
    body('data.OIB').isLength({ min: 11, max: 11 }).isNumeric(),

    // Name field must consists of letters
    body('data.name').isAlpha(),

    // Surname field must consists of letters
    body('data.surname').isAlpha(),

    // Credit card must consists of 16 numbers
    body('data.creditCard').isLength({ min: 16, max: 16 }).isNumeric(),
  ],
  async (req, res, next) => {
    const emailCheck = await Racun.findOne({
      where: emailCheck,
    });
  }
);

module.exports = router;
