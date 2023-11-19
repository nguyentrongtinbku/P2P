const express = require("express");
const mongoose = require("mongoose");
const os = require("os");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const cors = require("cors");
const User = require("./model/User");
const ping = require("ping");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/MMT", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected in mongdb");
  } catch (error) {
    console.log("ko ket noi duoc");
  }
}
connect();

app.use(bodyParser.json());
app.use(bodyParser.text());

app.post("/register", async (req, res) => {
  const networkInterfaces = os.networkInterfaces();
  const clientIp = networkInterfaces["Wi-Fi"][1].address;
  const newData = new User({
    username: req.body.username,
    password: req.body.password,
    ipv4: clientIp,
    isAdmin: false,
  });
  newData.save();
  res.json("oke");
});
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json("Wrong username!");
    }
    if (req.body.password != user.password) {
      return res.status(404).json("Wrong password!");
    }
    res.json(user);
  } catch (error) {
    res.json("dang nhap fail");
  }
});

// app.post("/publish", async (req, res) => {
//   const { localFilePath, serverFileName } = req.body;
//   const networkInterfaces = os.networkInterfaces();
//   const clientIp = networkInterfaces["Wi-Fi"][1].address;
//   try {
//     const file = new File({ clientIp, localFilePath, serverFileName });
//     await file.save();
//   } catch (err) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while saving the file information." });
//   }
// });

// app.post("/fet", async (req, res) => {
//   try {
//     const serverFileName = req.body;
//     const fileInfo = await File.findOne({ serverFileName });
//     if (!fileInfo) {
//       res.status(404).json({ error: "File not found" });
//     } else {
//       console.log(fileInfo.clientIp);
//       downloadFileFromIP(
//         fileInfo.clientIp,
//         3000,
//         fileInfo.localFilePath,
//         "C:\\test_btl\\download\\" + getLastNameFromPath(fileInfo.localFilePath)
//       );
//       res.json(fileInfo);
//     }
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching file information." });
//   }
// });

// fake data
// var newfile = {
//   path: "acascacac",
//   name_file: "bai5.pdf",
// };
// const user = await User.findOne({ username: "thientran" });
// user.file.push(newfile);
// await user.save();
// res.json(user);

app.post("/ping", async (req, res) => {
  
  try {
    const user = await User.find({ username: req.body.username });
    ping.sys.probe(user[0].ipv4, (isAlive) => {
      if (isAlive) {
        res.json("Active")
      } else {
        res.json("Inactive")
      }
    });
  } catch (error) {
    res.json("axios fail");
  }
});
app.post("/discover", async (req, res) => {
  try {
    try {
      const user = await User.find({ username: req.body.username });
      res.json(user[0].file);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  } catch (error) {
    res.json("dang nhap fail");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function discover(clientIp) {
  try {
    await mongoose.connect("mongodb://localhost/MMT", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const files = await File.find({ clientIp: clientIp });
    const serverFileNames = files.map((file) => file.serverFileName);
    console.log("List of local files:", serverFileNames);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const { Console } = require("console");

function pingClient(clientIp) {
  return new Promise((resolve, reject) => {
    ping.sys.probe(clientIp, (isAlive) => {
      if (isAlive) {
        console.log("Active");
      } else {
        console.log("Inactive");
      }
    });
  });
}

function downloadFileFromIP(ipAddress, port, filePath, localFilePath) {
  const net = require("net");
  const fs = require("fs");
  const client = new net.Socket();
  client.connect(port, ipAddress, () => {
    client.write(`GET ${filePath}\r\n\r\n`);
  });
  client.on("data", (data) => {
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

// Command shell
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: "Command> ",
// });
// rl.prompt();
// rl.on("line", (line) => {
//   const input = line.trim();
//   const args = input.split(" ");

//   if (args.length >= 1) {
//     const command = args[0];
//     if (command === "exit") {
//       rl.close();
//       return;
//     }
//     if (command === "discover") {
//       if (args.length === 2) {
//         const arg = args[1];
//         discover(arg);
//       } else {
//         console.log("Invalid command. Usage: discover arg");
//       }
//     } else if (command === "ping") {
//       if (args.length === 2) {
//         const arg = args[1];
//         pingClient(arg);
//       } else {
//         console.log("Invalid command. Usage: ping arg");
//       }
//     } else {
//       console.log(`Command not recognized: ${command}`);
//     }
//   } else {
//     console.log("Invalid command.");
//   }
//   rl.prompt();
// }).on("close", () => {
//   console.log("Command shell đã đóng");
//   process.exit(0);
// });
