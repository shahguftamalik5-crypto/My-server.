const express = require('express');
const path = require('path'); // Ye line zaroori hai
const app = express();
const port = process.env.PORT || 3000;

// Ye batata hai ki jab koi link khole toh index.html dikhao
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
