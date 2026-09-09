import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/orangeoffices/dist/client';
const types = { '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };
http.createServer((request, response) => {
  const clean = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).replace(/^\/+/, '');
  let file = path.join(root, clean);
  if (!path.extname(file)) file = path.join(file, 'index.html');
  fs.readFile(file, (error, data) => {
    if (error) { response.writeHead(404); response.end('Not found'); return; }
    response.writeHead(200, { 'content-type': types[path.extname(file)] || 'text/html; charset=utf-8' });
    response.end(data);
  });
}).listen(4321, '127.0.0.1');
