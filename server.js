const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Static files (HTML, CSS, JS) serve karne ke liye
app.use(express.static(path.join(__dirname, '/')));

// Aapke Minecraft server ki IP
const SERVER_IP = 'Brothershood-hCFt.aternos.me';

// Route: Index page dikhane ke liye
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route: Server ka real-time status check karne ke liye
app.get('/api/status', async (req, res) => {
    try {
        const response = await axios.get(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        res.json({
            online: response.data.online,
            players: response.data.players ? response.data.players.online : 0,
            version: response.data.version || "Unknown"
        });
    } catch (error) {
        res.status(500).json({ error: "Could not fetch status" });
    }
});

// Render ko "Wake Up" rakhne ke liye self-ping (Optional)
setInterval(() => {
    console.log("Keep-alive ping sent!");
}, 600000); // Har 10 minute mein console log karega

app.listen(PORT, () => {
    console.log(`Bhaichara Panel is running on port ${PORT}`);
    console.log(`Checking status for: ${SERVER_IP}`);
});
