'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
var fs = require("fs-extra");

const pictureStore = {

  store: new JsonStore('./models/picture-store.json', { pictures: [] }),
  collection: 'pictures',
  pictureFolder: 'models/pictures/',

  init() {
    fs.ensureDirSync('./' + this.pictureFolder);
    let fullpath = __dirname.split('/');
    fullpath.pop();
    this.path = fullpath.join('/') + '/' + this.pictureFolder;
  },

  getAlbum(userid) {
    return this.store.findOneBy(this.collection, { userid: userid });
  },

  storePicture(userId, imageFile) {
    fs.ensureDirSync(this.pictureFolder + userId);
    const imgFullPath = this.pictureFolder + '/' + userId + '/' + imageFile.name;;
    imageFile.mv(imgFullPath, function (err) {
      if (err) {
        console.log('error saving picture');
      }
    });
  },

  addPicture(userId, title, imageFile) {
    this.storePicture(userId, imageFile);
    let album = this.getAlbum(userId);
    if (!album) {
      album = {
        userid: userId,
        pictures: [],
      };
      this.store.add(this.collection, album);
    }

    const picture = {
      title: title,
      img: '/' + userId + '/' + imageFile.name,
      file: imageFile.name,
    }
    album.pictures.push(picture);
  },

  getFullPath(id, name) {
    return this.path + id + '/' + name;
  },
};

module.exports = pictureStore;
