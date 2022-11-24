
// // // cấu hình news

const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/AuthController');

const sitescontroller = require('../app/controllers/SitesController');


router.get("/", AuthController.login);

module.exports = router;

