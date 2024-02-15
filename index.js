const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    // Mapping URL paths to file paths
    const pageMap = {
        '/': '/index.html',
        '/about': '/about.html',
        '/contact-me': '/contact-me.html'
    };

    // If the requested URL is in the pageMap, use the mapped file path
    if (pageMap[req.url]) {
        filePath = '.' + pageMap[req.url];
    }

    // Check if the requested file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            // Serve the requested file
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else {
            // If the file doesn't exist, serve the 404 page
            fs.readFile('./404.html', (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        }
    });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

