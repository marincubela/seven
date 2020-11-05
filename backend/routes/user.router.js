const express = require('express');
const session = require('express-session');
const { body, validationResult } = require('express-validator');

const Racun = require('../models/Racun');
const { arePasswordEqual } = require('../utils/password');

const router = express.Router();

/*
  This endpoint will return all users in app

  If user is logged, this will retun with status 200 and:
  {
    data: {
      user: {
        email: string,
        password: string,
      }
    }
  }

  If user is not logged, this will return with status 401 and:
  {
    error: {
      message: string,
    }
  }
*/
router.get('/', async (req, res) => {
  if (!req.session.user.admin) {
    return res.status(401).json({
      error: {
        message: 'Neovlaštena radnja',
      },
    });
  }

  // find user by id and retunt it
  return res.json({
    data: {
      users: 2, //return it here!,
    },
  });
});

/*
  This endpoint will return a user with a given id

  If user is logged, this will retun with status 200 and:
  {
    data: {
      user: {
        
      }
    }
  }

  If user is not logged, this will return with status 401 and:
  {
    error: {
      message: string,
    }
  }
*/
router.get('/:id', async (req, res) => {
  if (!(req.session.user.admin || req.session.user.id === req.query.id)) {
    return res.status(401).json({
      error: {
        message: 'Neovlaštena radnja',
      },
    });
  }

  // find user by id and return it
  const id = req.query.id;
  const user = await Racun.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    return res.json({
      error: {
        message: `Korisnik s id=${id} ne postoji`,
      },
    });
  }

  return res.json({
    data: {
      user: user.toJSON(), //return it here!,
    },
  });
});

module.exports = router;
