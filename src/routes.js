const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const boxController = require('./controllers/BoxController');
const fileController = require('./controllers/FileController');

routes.get('/test', (req, resp) => {
  return resp.send('Hello Rocket');
});

// Box
routes.post('/boxes', boxController.store);
routes.get('/boxes/:id', boxController.show);

routes.post(
  '/boxes/:id/files',
  multer(multerConfig).single('file'),
  fileController.store
);
module.exports = routes;
