'use strict';

const logger = require('../utils/logger');
const accounts = require('./accounts.js');
const pictureStore = require('../models/picture-store.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'PictureBook Dashboard',
      user: loggedInUser,
      album: pictureStore.getAlbum(loggedInUser.id),
    };
    response.render('dashboard', viewData);
  },

  uploadPicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.addPicture(loggedInUser.id, request.body.title, request.files.picture);
    response.redirect('/dashboard');
  },

  getPicture(request, response) {
    const fullPicturePath = pictureStore.getFullPath(request.params.path, request.params.name);
    response.sendFile(fullPicturePath);
  },
};

module.exports = dashboard;
