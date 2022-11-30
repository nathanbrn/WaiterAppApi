import path from 'node:path';
import { router } from './router';
import express from 'express';
import mongoose from 'mongoose';
import http from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect('mongodb+srv://dev:WGeEL1v3CyCRgOq7@cluster0.agarbc8.mongodb.net/?retryWrites=true&w=majority').then(() =>{
  const port = 3001;

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    next();
  });
  app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
  app.use(express.json());
  app.use(router);

  server.listen(port, () => {
    console.log('🚀 Server is running...');
  });
})
  .catch(() => console.log('Erro ao conectar no mongodb'));
