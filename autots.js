/** @format */

const fs = require('fs');
const path = require('path');

const renameFiles = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      renameFiles(filePath);
    } else if (filePath.endsWith('.js')) {
      fs.renameSync(filePath, filePath.replace('.js', '.ts'));
    }
  });
};

renameFiles('./src'); // adjust your directory as needed
