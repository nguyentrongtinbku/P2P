//Command shell
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Command> '
});
rl.prompt();
rl.on('line', (line) => {
  const input = line.trim();
  const args = input.split(' ');

  if (args.length >= 1) {
    const command = args[0];
    if (command === 'exit') {
      rl.close();
      return;
    }
    if (command === 'publish') {
      if (args.length === 3) {
        const arg1 = args[1];
        const arg2 = args[2];
        publish(arg1, arg2);
      } else {
        console.log('Invalid command. Usage: publish arg1 arg2');
      }
    } else if (command === 'fetch') {
      if (args.length === 2) {
        const arg = args[1];
        fet(arg);
      } else {
        console.log('Invalid command. Usage: fet arg');
      }
    } else {
      console.log(`Command not recognized: ${command}`);
    }
  } else {
    console.log('Invalid command.');
  }

  rl.prompt();
}).on('close', () => {
  console.log('Command shell đã đóng');
  process.exit(0);
});


async function publish(path, name) {
    const data = {
      localFilePath: path,
      serverFileName: name,
    };
    try {
      const response = await fetch('http://localhost:3000/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log( 'An error occurred:' + error);
  }
}
  
async function fet(serverFileName) {
  try {
    const response = await fetch('http://localhost:3000/fet',{
                          method: 'POST',
                          headers: {
                            'Content-Type': 'text/plain',
                          },
                          body: serverFileName,
                        });
    if (response.ok) {
      const fileInfo = await response.json();
      downloadFileFromIP(fileInfo.clientIp, 3000, fileInfo.localFilePath, "C:\\test_btl\\download\\"+getLastNameFromPath(fileInfo.localFilePath));
    } else {
      console.log('File not found');
    }
  } catch (error) {
    console.log('Error');
  }
}
function downloadFileFromIP(ipAddress, port, filePath, localFilePath) {
  const net = require('net');
  const fs = require('fs');
  const client = new net.Socket();
  client.connect(port, ipAddress, () => {
    client.write(`GET ${filePath}\r\n\r\n`);
  });
  client.on('data', (data) => {
    fs.appendFileSync(localFilePath, data);
  });
}

function getLastNameFromPath(path) {
  const matches = path.match(/[^\\]+$/);
  if (matches) {
    return matches[0];
  } else {
    return null;
  }
}

/*const express = require('express');
const app = express();
const port = 3000; 
app.listen(port, () => {});*/











