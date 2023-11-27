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

  try {
    const newData = new User({
      username: req.body.username,
      password: req.body.password,
      ipv4: clientIp,
      isAdmin: false,
    });

    await newData.save();
    res.json("Registration successful");
  } catch (error) {
    res.json(error);
  }
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

app.post("/publish", async (req, res) => {
  const { localFilePath, serverFileName, username } = req.body;
  //const networkInterfaces = os.networkInterfaces();
  //const clientIp = networkInterfaces["Wi-Fi"][1].address;
  // const clientIp = req.ip;
  try {
    const user = await User.findOne({ username });
    const file = { path: localFilePath, name_file: serverFileName };
    user.file.push(file);
    // user.ipv4 = clientIp;
    await user.save();
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while saving the file information." });
  }
});

function downloadFileFromIP(ipAddress, port, filePath, localFilePath) {
  const net = require("net");
  const fs = require("fs");
  console.log(localFilePath)
  const client = new net.Socket();
  client.connect(port, ipAddress, () => {
    client.write(`GET ${filePath}\r\n\r\n`);
  });
  client.on("data", (data) => {
    if (data.length > 0) {
      fs.appendFileSync(localFilePath, data);
    }
  },
  client.on("error", (err) => {
    console.error("Socket error:", err);
    // In ra thông báo lỗi hoặc xử lý lỗi tùy thuộc vào yêu cầu của bạn
  })
  );
}

app.post("/fet", async (req, res) => {
  try {
    const serverFileName = req.body;
    const user = await User.findOne({ "file.name_file": serverFileName });
    if (!user) {
      res.status(404).json({ error: "File not found" });
    } else {
      const file = user.file.find((f) => f.name_file === serverFileName);
      downloadFileFromIP(
        file.clientIp,
        3000,
        file.path,
        "C:\\test_btl\\download\\" + getLastNameFromPath(file.path)
      );
      res.json(file);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching file information." });
  }
});

app.post("/ping", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    ping.sys.probe(user[0].ipv4, (isAlive) => {
      if (isAlive) {
        res.json("Active");
      } else {
        res.json("Inactive");
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

app.get("/allfile", async (req, res) => {
  try {
    // Sử dụng phương thức find để lấy tất cả các documents từ collection 'users'
    const users = await User.find({}, "file");
    // Trả về mảng các username
    res.json(
      users
        .map((user) => user.file)
        .filter((subArray) => subArray.length > 0)
        .flat()
    );
  } catch (error) {
    console.error("Error retrieving usernames:", error.message);
    throw error;
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
const { format } = require("path");

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


function getLastNameFromPath(path) {
  const matches = path.match(/[^\\]+$/);
  if (matches) {
    return matches[0];
  } else {
    return null;
  }
}
