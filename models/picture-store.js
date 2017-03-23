'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const fs = require('fs');

const pictureStore = {

  store: new JsonStore('./models/picture-store.json', { pictures: [] }),
  collection: 'pictures',
  pictureFolder: 'models/pictures/',
  picturePath: '',

  init() {
    if (!fs.existsSync('./' + this.pictureFolder)) {
      fs.mkdirSync('./' + this.pictureFolder);
    }

    let fullpath = __dirname.split('/');
    fullpath.pop();
    this.path = fullpath.join('/') + '/' + this.pictureFolder;
  },

  getAlbum(userid) {
    return this.store.findOneBy(this.collection, { userid: userid });
  },

  addPicture(userId, imageFile) {
    if (!fs.existsSync(this.pictureFolder + userId)) {
      fs.mkdirSync(this.pictureFolder + userId);
    }

    const imgPath = '/' + userId + '/' + imageFile.name;
    const imgFullPath = this.pictureFolder + imgPath;

    imageFile.mv(imgFullPath, function (err) {
      if (err) {
        console.log('error saving picture');
      }
    });

    let album = this.getAlbum(userId);
    if (!album) {
      album = {
        userid: userId,
        pictures: [],
      };

      this.store.add(this.collection, album);
    }

    album.pictures.push(imgPath);
    this.store.write();
  },

  getFullPath(id, name) {
    return this.path + id + '/' + name;
  },
};

module.exports = pictureStore;
