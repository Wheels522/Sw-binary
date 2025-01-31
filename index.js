const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(`
    function generateBinary() {
        let binaryString = "";
        for (let i = 0; i < 51; i++) {
            binaryString += Math.round(Math.random());
        }
        return binaryString;
    }

    function updateBinary(data) {
        const elements = document.getElementsByClassName("binary");
        for (let i = 0; i < elements.length; i++) {
            elements[i].textContent = data.substring(i * 50, (i + 1) * 50);
        }
    }

    function binaryEffect() {
        document.body.style.backgroundColor = "black";

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexWrap = "wrap";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.position = "absolute";
        container.style.top = "0";
        container.style.left = "0";
        document.body.appendChild(container);

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const columns = Math.floor(screenWidth / 50);
        const rows = Math.floor(screenHeight / 20);
        const totalElements = columns * rows;
        const extra = screenWidth % 50; // To cover the remaining space

        for (let i = 0; i < totalElements; i++) {
            const binaryElement = document.createElement("div");
            binaryElement.classList.add("binary");
            binaryElement.textContent = generateBinary();
            binaryElement.style.width = (50 + extra / columns) + "px";
            binaryElement.style.height = "20px";
            binaryElement.style.overflow = "hidden";
            binaryElement.style.color = "lime"; // Green text color
            container.appendChild(binaryElement);
        }

        console.log(\`Doge Unblocker @ Port 3000\`);

        const ws = new WebSocket("wss://tireunblocker.pages.dev:3000");

        ws.onmessage = function(event) {
            updateBinary(event.data);
        };
    }

    binaryEffect();

    setInterval(function() {
        const elements = document.getElementsByClassName("binary");
        for (let i = 0; i < elements.length; i++) {
            elements[i].textContent = generateBinary();
        }
    }, 100);
  `);
});

server.on("listening", () => {
  console.log(`Doge Unblocker @ Port 3000`);
});

server.listen({
  port: 3000,
});
