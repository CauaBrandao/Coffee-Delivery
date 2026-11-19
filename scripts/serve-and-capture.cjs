const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DIST_DIR = path.join(__dirname, '..', 'dist');
const SCREENSHOT_DIR = path.join(__dirname, '..', 'docs', 'screenshots');

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(DIST_DIR, urlPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

function captureScreenshot({ url, output, width, height, delay = 2000 }) {
  return new Promise((resolve, reject) => {
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--run-all-compositor-stages-before-draw',
      `--virtual-time-budget=${delay}`,
      `--window-size=${width},${height}`,
      `--screenshot=${output}`,
      url,
    ];

    console.log(`Capturing: ${path.basename(output)} (${width}x${height})...`);
    execFile(CHROME_PATH, args, (err) => {
      if (err) {
        console.error(`Failed ${output}:`, err);
        return reject(err);
      }
      const size = fs.statSync(output).size;
      console.log(`Saved: ${path.basename(output)} (${size} bytes)`);
      resolve();
    });
  });
}

const PORT = 4321;
server.listen(PORT, '127.0.0.1', async () => {
  console.log(`Local test server running at http://127.0.0.1:${PORT}`);

  try {
    // 1. Home Light
    await captureScreenshot({
      url: `http://127.0.0.1:${PORT}/?theme=light#/`,
      output: path.join(SCREENSHOT_DIR, 'home-light.png'),
      width: 1440,
      height: 1080,
    });

    // 2. Home Dark
    await captureScreenshot({
      url: `http://127.0.0.1:${PORT}/?theme=dark#/`,
      output: path.join(SCREENSHOT_DIR, 'home-dark.png'),
      width: 1440,
      height: 1080,
    });

    // 3. Checkout (with demo cart items)
    await captureScreenshot({
      url: `http://127.0.0.1:${PORT}/?demo=1#/checkout`,
      output: path.join(SCREENSHOT_DIR, 'checkout.png'),
      width: 1440,
      height: 980,
    });

    // 4. Success Order
    await captureScreenshot({
      url: `http://127.0.0.1:${PORT}/?demo=1#/success`,
      output: path.join(SCREENSHOT_DIR, 'success.png'),
      width: 1440,
      height: 850,
    });

    // 5. Mobile
    await captureScreenshot({
      url: `http://127.0.0.1:${PORT}/#/`,
      output: path.join(SCREENSHOT_DIR, 'mobile.png'),
      width: 390,
      height: 844,
    });

    console.log('All screenshots completed successfully!');
  } catch (err) {
    console.error('Capture failed:', err);
  } finally {
    server.close(() => {
      console.log('Server stopped.');
      process.exit(0);
    });
  }
});
