const fs = require('fs');

fs.readdir('./03-files-in-folder/secret-folder', (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      fs.stat(`./03-files-in-folder/secret-folder/${file}`, (err, stats) => {
        if (err) {
          console.log(err);
        } else if (stats.isFile()) {
          const fileSizeInBytes = stats.size;
          const fileSizeInKb = fileSizeInBytes / 1024;
          const fileName = file.split('.')[0];
          const fileExtension = file.split('.')[1];
          console.log(`${fileName} - ${fileExtension} - ${fileSizeInKb.toFixed(3)}kb`);
        }
      });
    });
  }
});