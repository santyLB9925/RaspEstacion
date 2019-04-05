var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3002);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


var mesage;
var bmp;
var latitud;
var longitud;
var latitud;
var latlon = new Array();
io.on('connection', function (socket) {

  socket.on('lat', function (data) {
    if (data != null) {
    
latitud =data;
    latlon[0] = latitud;
    console.log(latlon[0]);
    }
   }
  );

  
  socket.on('lon', function (data) {
    if (data != null) {
    //console.log(data);
    latlon[1] = data;
       
  }

   }
  );
  socket.emit('receivegps',latlon);

  socket.on('bmp', function (datos) {
    console.log(datos);
   bmp =datos;
   console.log("Entro")
   }
  );
  socket.emit('bmpreceive',bmp);

  socket.on('sendData', function (data) {
    console.log(data);
    mesage=data;
  });

 socket.emit('news',mesage);
 
});