const { hashPassword } = require('../utils/password');
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Racun = require('../models/Racun');
const Klijent = require('../models/Klijent');
const Tvrtka = require('../models/Tvrtka');

/*router.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      return {
        value,
        message: msg,
        param,
        location,
      };
    },
  })
);*/

// Will create a Racun model
const createAccount = async ({ email, oib, password }) => {
  const user = await Racun.create({
    email,
    OIB: oib,
    admin: false,
    lozinka: await hashPassword(password),
  });

  return user;
};

//Will create a Tvrtka model
const createCompany = async ({ companyName, address, racunId }) => {
  const company = await Tvrtka.create({
    naziv: companyName,
    adresa: address,
    racunId,
  });
};

//Will create a Klijent model
const createClient = async ({
  firstname,
  lastname,
  creditCardNumber,
  racunId,
}) => {
  const client = await Klijent.create({
    prezime: lastname,
    ime: firstname,
    brojKartice: creditCardNumber,
    racunId,
  });
};

let emailCheck = async (email) => {
  const accountWithEmail = await Racun.findOne({
    where: {
      email,
    },
  });

  return Boolean(accountWithEmail);
};

let oibCheck = async (oib) => {
  const accountWithOIB = await Racun.findOne({
    where: {
      OIB: oib,
    },
  });

  return Boolean(accountWithOIB);
};

let creditCardCheck = async (number) => {
  const accountWithCardNumber = await Klijent.findOne({
    where: {
      brojKartice: number,
    },
  });

  return Boolean(accountWithCardNumber);
};

/*
  This endpoint is used for registrating the client (Will create a Klijent account).

  It is expecting
  {
    data: {
      email: string,
      oib: string,
      creditCardNumber: string,
      firstname: string,
      lastname: string,
      password: string,
    }
  }

  If registration is succesfull, this user is logged in and 
  this will retun with status 200 and:
  {
    data: {
      user: {
        id: integer,
        email: string,
        admin: boolean,
      }
    }
  }
  User object from data is also stored in session.user

  If user is not logged, this will return with status 400 and:
  {
    errors: [
      {
        value: string,
        param: string
        message: string,
        location: string
      }
    ]
  }
*/
router.post(
  '/user',
  [
    // email field needs to be an email
    body('data.email')
      .isEmail()
      .withMessage('Email je neispravan')
      .custom((email) =>
        emailCheck(email).then((emailExist) => {
          if (emailExist) {
            return Promise.reject('Račun u uporabi');
          }
        })
      ),

    // password field is required
    body('data.password').not().isEmpty().withMessage('Lozinka je prazna'),

    // OIB field length must be 11
    body('data.oib')
      .isNumeric()
      .withMessage('OIB mora imati samo brojeve')
      .isLength({ min: 11, max: 11 })
      .withMessage('OIB mora imati 11 brojeva')
      .custom((oib) =>
        oibCheck(oib).then((oibExist) => {
          if (oibExist) {
            return Promise.reject('Račun u uporabi');
          }
        })
      ),
    // Name field must consists of letters
    body('data.firstname').not().isEmpty().withMessage('Ime je prazno'),

    // Name field must consists of letters
    body('data.lastname').not().isEmpty().withMessage('Prezime je prazno'),

    // Credit card must consists of 16 numbers
    body('data.creditCardNumber')
      .not()
      .isEmpty()
      .withMessage('Kreditna kartica ne smije biti prazna')
      .isNumeric()
      .withMessage('Kreditna kartica mora sadržavati samo brojeve')
      .isLength({ min: 16, max: 16 })
      .withMessage('Kreditna kartica mora sadržavati 16 brojeva')
      .custom((creditCard) =>
        creditCardCheck(creditCard).then((creditCardExist) => {
          if (creditCardExist) {
            return Promise.reject('Račun u uporabi');
          }
        })
      ),
  ],
  async (req, res, next) => {
    const errors = validationResult.withDefaults({
      formatter: (error) => {
        return {
          value: error.value,
          message: error.msg,
          param: error.param,
          location: error.location,
        };
      },
    })(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email,
      oib,
      creditCardNumber,
      firstname,
      lastname,
      password,
    } = req.body.data;

    var user = await createAccount({ email, oib, password });

    await createClient({
      firstname,
      lastname,
      creditCardNumber,
      racunId: user.id,
    });

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

/*
  This endpoint is used for registrating the company (Will create a Tvrtka account).

  It is expecting
  {
    data: {
      email: string,
      password: string,
      oib: string,
      companyName: string,
      address: string
    }
  }

  If registration is succesfull, this user is logged in and 
  this will retun with status 201 and:
  {
    data: {
      user: {
        id: integer,
        email: string,
        admin: boolean,
      }
    }
  }
  User object from data is also stored in session.user

  If user is not logged, this will return with status 400 and:
  {
    errors: [
      {
        value: string,
        param: string,
        message: string,
        location: string
      }
    ]
  }
*/
router.post(
  '/company',
  [
    // email field needs to be an email
    body('data.email')
      .isEmail()
      .withMessage('Email je neispravan')
      .custom((email) =>
        emailCheck(email).then((emailExist) => {
          if (emailExist) {
            return Promise.reject('Račun u uporabi');
          }
        })
      ),

    // password field is required
    body('data.password').not().isEmpty().withMessage('Lozinka je prazna'),

    // OIB field length must be 11
    body('data.oib')
      .isNumeric()
      .withMessage('OIB mora imati samo brojeve')
      .isLength({ min: 11, max: 11 })
      .withMessage('OIB mora imati 11 brojeva')
      .custom((oib) =>
        oibCheck(oib).then((oibExist) => {
          if (oibExist) {
            return Promise.reject('Račun u uporabi');
          }
        })
      ),

    // Company name field is required
    body('data.companyName')
      .not()
      .isEmpty()
      .withMessage('Ime tvrtke je prazno'),

    // Adress field is required
    body('data.address').not().isEmpty().withMessage('Adresa je prazna'),
  ],
  async (req, res, next) => {
    const errors = validationResult.withDefaults({
      formatter: (error) => {
        return {
          value: error.value,
          message: error.msg,
          param: error.param,
          location: error.location,
        };
      },
    })(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, oib, companyName, password, address } = req.body.data;

    var user = await createAccount({ email, oib, password });

    await createCompany({
      address,
      companyName,
      racunId: user.id,
    });

    req.session.user = {
      id: user.id,
      email: user.email,
      admin: user.admin,
    };

    return res.status(201).json({
      data: {
        user: req.session.user,
      },
    });
  }
);

module.exports = router;
