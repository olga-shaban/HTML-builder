const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const filePath = './text.txt';

fs.open(filePath, 'w', (err, fd) => {
  if (err) throw err;
  console.log(`File ${filePath} created!`);
  rl.prompt();
});

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Goodbye!');
    rl.close();
  } else {
    fs.appendFile(filePath, input + '\n', (err) => {
      if (err) throw err;
      console.log(`Text "${input}" appended to ${filePath}`);
      rl.prompt();
    });
  }
});

rl.on('SIGINT', () => {
  console.log('Goodbye!');
  rl.close();
});