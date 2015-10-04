var Phoenix = require('../phoenix');
var QuackRoom = require('./room');
var QuackRoomListing = require('./room_listing');

var socket = new Phoenix.Socket('ws://' + location.host + '/ws');
socket.connect();
socket.onClose(function(e) { console.log("Close", e); });

var QuackSocket = {
  socket: socket,
  createRoom: function(roomName) {
    chan = socket.chan('rooms:' + roomName, {});
    return new QuackRoom(chan);
  }

  listRooms: function() {
    chan = socket.chan('room_listings:' + roomName, {});
    return new QuackRoomListing(chan);
  }
}; 
module.exports = QuackSocket;
