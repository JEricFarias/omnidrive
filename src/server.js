const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// const env = require('./config/enviroments');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  });
});

mongoose.connect(process.env.MONGOBD_CONNECT, {
  useNewUrlParser: true
});

// Adciona uma prop io com as informações dos sockets pra todos as requisições
app.use((req, resp, next) => {
  req.io = io;

  return next();
});

// midware para interpretar json
// midware para permitir e interpretar envio de arquivos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 8080, () => {
  console.log(server.address());
});
