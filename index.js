var express = require('express');
var app = express();
var server = require('http').createServer(app);
var sock = null;
var osc = require('node-osc');


// Creates Server 
var Server = function(browserPort) {
  this.io = require('socket.io')(server); //Creates my http server
  app.use(express.static(__dirname));
  server.listen(browserPort, function () {   
      console.log('Server listening at port %d', browserPort);
  }); 
}

Server.prototype.handleConnection = function(socket){
  sock = socket;
  console.log(sock);
}

Server.prototype.init = function(){
  console.log("Server initialized!")
  this.io.on('connection', this.handleConnection)
}

Server.prototype.sendClientMsg = function(id, msg) {
  if(sock) {
    console.log("sending msg")
    sock.emit(id, {msg:msg});
  }
} 


// Handles OSC Data
var oscServer = new osc.Server(12345, '127.0.0.1');

// FFT -> [ChannelD, 1hz - 125hz]
oscServer.on("/openbci", function (data, rinfo) {
      switch (data[1]) {
        case 1:
          server.sendClientMsg("channel1", data)
          //console.log("Channel 1: ", data[11]);
          break; /*
        case 2:
          console.log("Channel 2: " + data[11]);
          break;
        case 3:
          console.log("Channel 3: " + data[11]);
          break;
        case 4:
            console.log("Channel 4: " + data[11]);
            break;*/
        default:
      }
});


server = new Server("8080");
server.init();