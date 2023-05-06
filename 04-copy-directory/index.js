const fs = require('fs');
const path = require('path');

function copyDir() {
  const sourceDir = './04-copy-directory/files';
  const destDir = './04-copy-directory/files-copy';

  // Создаем папку files-copy, если её нет
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }

  // Читаем содержимое папки files
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      // Копируем каждый файл
      files.forEach(file => {
        const sourceFile = path.join(sourceDir, file);
        const destFile = path.join(destDir, file);

        // Статистика файла
        fs.stat(sourceFile, (err, stats) => {
          if (err) {
            console.log(err);
          } else {
            // Если файл - директория, рекурсивно копируем её содержимое
            if (stats.isDirectory()) {
              copyDirRecursive(sourceFile, destFile);
            } else {
              // Если файл - обычный файл, копируем его
              const readStream = fs.createReadStream(sourceFile);
              const writeStream = fs.createWriteStream(destFile);
              readStream.pipe(writeStream);
            }
          }
        });
      });
    }
  });
}

// Функция для рекурсивного копирования директорий
function copyDirRecursive(sourceDir, destDir) {
  // Создаем папку назначения, если её нет
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }

  // Читаем содержимое папки исходника
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      // Копируем каждый файл
      files.forEach(file => {
        const sourceFile = path.join(sourceDir, file);
        const destFile = path.join(destDir, file);

        // Статистика файла
        fs.stat(sourceFile, (err, stats) => {
          if (err) {
            console.log(err);
          } else {
            // Если файл - директория, рекурсивно копируем её содержимое
            if (stats.isDirectory()) {
              copyDirRecursive(sourceFile, destFile);
            } else {
              // Если файл - обычный файл, копируем его
              const readStream = fs.createReadStream(sourceFile);
              const writeStream = fs.createWriteStream(destFile);
              readStream.pipe(writeStream);
            }
          }
        });
      });
    }
  });
}

// Запускаем копирование
copyDir();
