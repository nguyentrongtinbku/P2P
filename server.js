const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; 
mongoose.connect('mongodb://localhost/MMT', { useNewUrlParser: true, useUnifiedTopology: true });

const fileSchema = new mongoose.Schema({
    clientIp: String,
    localFilePath: String,
    serverFileName: String,
});

const File = mongoose.model('File', fileSchema);

app.use(bodyParser.json());
app.use(bodyParser.text());

app.post('/publish', async (req, res) => {
    const { localFilePath, serverFileName } = req.body;
    const clientIp = req.ip;
    try {
      const file = new File({ clientIp, localFilePath, serverFileName });
      await file.save();
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while saving the file information.' });
    }
  });

app.post('/fet', async (req, res) => {
    try {
      const serverFileName = req.body;
      const fileInfo = await File.findOne({ serverFileName });
      if (!fileInfo) {
        res.status(404).json({ error: 'File not found' });
      } else {
        res.status(200).json({
          clientIp: fileInfo.clientIp,
          localFilePath: fileInfo.localFilePath,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching file information.' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  async function discover(clientIp) {
    try {
      await mongoose.connect('mongodb://localhost/MMT', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const files = await File.find({ clientIp: clientIp });
      const serverFileNames = files.map(file => file.serverFileName);
      console.log('List of local files:', serverFileNames);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
const ping = require('ping');
function pingClient(clientIp) {
  return new Promise((resolve, reject) => {
    ping.sys.probe(clientIp, (isAlive) => {
      if (isAlive) {
        console.log('Active');
      } else {
        console.log('Inactive');
      }
    });
  });
}
  
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
    if (command === 'discover') {
      if (args.length === 2) {
        const arg = args[1];
        discover(arg);
      } else {
        console.log('Invalid command. Usage: discover arg');
      }
    } else if (command === 'ping') {
      if (args.length === 2) {
        const arg = args[1];
        pingClient(arg);
      } else {
        console.log('Invalid command. Usage: ping arg');
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
  