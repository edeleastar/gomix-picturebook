'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const accounts = require('./controllers/accounts.js');
const pictureStore = require('./models/picture-store.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/dashboard/getpicture/:path/:name', dashboard.getPicture);
router.post('/dashboard/uploadpicture', dashboard.uploadPicture);

pictureStore.init();

module.exports = router;
