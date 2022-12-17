const express = require("express");
const server = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;

server.use(express.json());
server.use(cors());

server.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT} `);
});
