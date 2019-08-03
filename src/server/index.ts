#!/usr/bin/env node

import http from 'http'
import app  from './app';
import { AddressInfo } from 'net';
import * as sequelize from './config/sequelize'

const pkg = require('../../package.json')

const debug = require('debug')(`${pkg.name}:server`);

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port)
server.on('error', onError);
server.on('listening', onListening);
sequelize.run(sequelize.init(), {
  force: false, 
  seed: false
})

process.once('SIGINT', function () {
  console.log('do SIGINT')
  process.exit(1)
})

function normalizePort (val: string | number): string | number | boolean {
  const port = parseInt(val.toString(), 10);

  if (isNaN(port)) return val
  if (port >= 0) return port
  return false;
}

function onError (error: any) {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + (addr as AddressInfo).port;
  debug('Listening on' + bind);
}

