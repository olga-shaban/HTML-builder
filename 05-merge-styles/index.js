const fs = require('fs');
const path = require('path');

function mergeStyles() {
  const sourceDir = './05-merge-styles/styles';
  const destFile = './05-merge-styles/project-dist/bundle.css';

  // Читаем содержимое папки styles
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      // Фильтруем только css файлы
      const cssFiles = files.filter(file => path.extname(file) === '.css');

      // Создаем WriteStream для записи в выходной файл
      const writeStream = fs.createWriteStream(destFile);

      // Копируем содержимое каждого css файла в выходной файл
      cssFiles.forEach(file => {
        const sourceFile = path.join(sourceDir, file);
        const readStream = fs.createReadStream(sourceFile);
        readStream.pipe(writeStream, { end: false });
      });

      // Закрываем WriteStream после завершения записи
      writeStream.on('finish', () => {
        writeStream.end();
      });
    }
  });
}

// Запускаем сборку стилей
mergeStyles();