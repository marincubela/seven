const express = require('express');
const Racun = require('../models/Racun');
const router = express.Router();

router.get('/', async (req, res) => {
    
  
});
router.post('/', async function (req, res, next) {
        let user = await Racun.findAll({
            where: {
              email: req.body.email
          });
        
            return;
        }

        if (!user.checkPassword(req.body.password)) {
            res.render('Login', {
                title: 'Log in',
                linkActive: 'login',
                user: req.session.user,
                err: 'Wrong password',
            });
            return;
        }

        req.session.user = user;
        res.redirect('/');
    })();

module.exports = router;
