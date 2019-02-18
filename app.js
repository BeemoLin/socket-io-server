const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
let maxUsers = 0;
let users = 0;
io.on("connection", socket => {
	if(users > maxUsers) {users = users + 1}
	users = users + 1;
		console.log("New client connected"), setInterval(
	() => getApiAndEmit(socket), 1000);

  	socket.on("disconnect", () => {
  		users = users - 1;
  		console.log("Client disconnected");
	});
});

const getApiAndEmit = async socket => {
  try {
    // const res = await axios.get(
    //   "https://api.darksky.net/forecast/PUT_YOUR_API_KEY_HERE/43.7695,11.2558"
    // );
    //socket.emit("FromAPI", res.data.currently.temperature);
    socket.emit("FromAPI", {users: users, maxUsers: maxUsers});
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));