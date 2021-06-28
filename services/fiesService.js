// include fs-extra package
var fs = require('fs-extra');

var source = '../Starter';
var destination = '../Starter1';

// copy source folder to destination
const copyfolder = (source, dtinatination) => {
  fs.copy(source, destination, function(err) {
    if (err) {
      console.log('An error occured while copying the folder.');
      return console.error(err);
    }
    console.log('Copy completed!');
  });
};

module.exports = {
  copyfolder
};
