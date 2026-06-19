const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser taaki login data read ho sake
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (HTML, CSS, JS) serve karne ke liye
app.use(express.static(path.join(__dirname, '/')));

// Aapke Minecraft server ki IP
const SERVER_IP = 'Brothershood-hCFt.aternos.me';

// Login Credentials
const ADMIN_USER = 'Admin123123';
const ADMIN_PASS = 'Admin_boss';

// Route: Login check karne ke liye API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Galat Username ya Password hai bhai!" });
    }
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

// Render ko 24/7 "Wake Up" rakhne ke liye aapka actual live URL
const RENDER_EXTERNAL_URL = 'https://minecraft-panel-8dw2.onrender.com'; 

setInterval(async () => {
    try {
        await axios.get(RENDER_EXTERNAL_URL);
        console.log("🚀 Self-ping successful! Render server is awake.");
    } catch (error) {
        console.error("❌ Self-ping failed:", error.message);
    }
}, 600000); // Har 10 minute mein ping karega

app.listen(PORT, () => {
    console.log(`Bhaichara Panel is running on port ${PORT}`);
    console.log(`Checking status for: ${SERVER_IP}`);
});
