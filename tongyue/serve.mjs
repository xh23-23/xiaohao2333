import http from 'node:http';
import {readFile} from 'node:fs/promises';
http.createServer(async(req,res)=>{if(!['/','/index.html'].includes(new URL(req.url,'http://localhost').pathname)){res.writeHead(404);res.end();return;}try{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(await readFile(new URL('./index.html',import.meta.url)));}catch{res.writeHead(500);res.end('Unable to open page');}}).listen(4174,'127.0.0.1',()=>console.log('http://127.0.0.1:4174'));
