//const {} = require('../../app');
const {createServer} = require('http');
const {readFile} = require('fs').promises;
const server = createServer();
server.on('request', async(req, res)=>{
    const jsf = await readFile('../../frontscript.js', 'utf-8');
    const js = await readFile('../../app.js', 'utf-8');
    const css = await readFile('../css/style.css', 'utf-8')
    if(req.url.indexOf('app.js') != -1){
        console.log(req.url);
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(js);
        res.end();
        return;
    }
    if(req.url.indexOf('frontscript.js') != -1){
        console.log(req.url);
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(jsf);
        res.end();
        return;
    }
    if(req.url.indexOf('style.css') != -1){
        res.writeHead(200, {'Content-Type' : 'text/css'});
        res.write(css);
        res.end();
        return;
    }
    const html = await readFile('../index.html', 'utf-8');
    res.writeHead(200, {
        'Content-type': 'text/html',
    });
    res.write(html);
    res.end();
} );
server.listen(3000, 'localhost');
