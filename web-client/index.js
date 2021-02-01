const path = require("path");
const express = require("express");
const app = express();

const appPath = path.join(__dirname, "client", "build");
const port = process.env.PORT || 3000;

app.use(express.static(appPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(appPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up on port : ", port);
});
