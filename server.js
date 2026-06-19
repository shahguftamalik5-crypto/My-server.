// Render ko 24/7 "Wake Up" rakhne ke liye actual self-ping script
const RENDER_EXTERNAL_URL = 'https://bhaichara-panel.onrender.com'; // <-- Yahan apni Render website ka actual URL daalna deploy karne ke baad

setInterval(async () => {
    try {
        await axios.get(RENDER_EXTERNAL_URL);
        console.log("🚀 Self-ping successful! Render server is awake.");
    } catch (error) {
        console.error("❌ Self-ping failed:", error.message);
    }
}, 600000); // Har 10 minute (600,000 ms) mein ping karega

app.listen(PORT, () => {
    console.log(`Bhaichara Panel is running on port ${PORT}`);
    console.log(`Checking status for: ${SERVER_IP}`);
});
