const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
export class ZipAFolder {
  static async zip(srcFolder, zipFilePath) {
    return new Promise((resolve, reject) => {
      ZipAFolder.zipFolder(srcFolder, zipFilePath, err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  static zipFolder(srcFolder, zipFilePath, callback) {
    // folder double check
    fs.access(srcFolder, fs.constants.F_OK, notExistingError => {
      if (notExistingError) {
        return callback(notExistingError);
      }
      fs.access(
        path.dirname(zipFilePath),
        fs.constants.F_OK,
        // tslint:disable-next-line: no-shadowed-variable
        notExistingError => {
          if (notExistingError) {
            return callback(notExistingError);
          }
          const output = fs.createWriteStream(zipFilePath);
          const zipArchive = archiver('zip');

          output.on('close', function() {
            callback();
          });

          zipArchive.pipe(output);
          zipArchive.directory(srcFolder, false);
          zipArchive.finalize();
        }
      );
    });
  }
}
