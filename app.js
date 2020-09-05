const express = require('express');

const app = express();

// routes
app.get('/', (req, res) => {
    res.send('home page');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));