// Complete the function, which reads data from a log file and only stores error logs in a separate file.
const fs = require('fs');
const readline = require('readline');

function generateSignature() {
    const now = new Date();
    return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
}

function captureErrors(includeSignature = false,logFilePath = 'data/logfile.log'){
// Write your streams and pipeline here...
// Note: Its always better if you return a promise inside a function to handle the async nature of the code
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(logFilePath, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream('data/errorlog.log', { encoding: 'utf8' });
    const readLineInterface = readline.createInterface({
        input: readStream,
        output: writeStream,
        terminal: false,
    });

    readStream.on('error', (err) => {
      console.log('Error while reading from input file: ', err);
      reject(err);
    })

    readLineInterface.on('line', (line) => {
      if (line.includes('ERROR')) {
        writeStream.write(line + '\n');
      }
    });

    readLineInterface.on('error', (err) => {
      console.log('Error in Read Line Interface: ', err);
      reject(err);
    })

    readLineInterface.on('close', () => {
      resolve('');
    })

    //---------------------xxxxxx------------------------------------------------

    //Uncomment the below function to generate the signature file

    // readStream.on('end', () => {
    //     if (includeSignature) {
    //         const signature = { signature: generateSignature() };
    //         fs.writeFileSync('./data/signature.json', JSON.stringify(signature));
    //     }
    // });

    //---------------------xxxxxx------------------------------------------------
  })
}
captureErrors();