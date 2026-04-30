const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Minecraft Panel is Online!</h1><p>Server is running perfectly.</p>');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
