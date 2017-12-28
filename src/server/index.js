const express = require('express');
const app = express();
const path = require('path');
const index = path.join(__dirname, 'index.html');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(index);
});

app.listen(3000, () => console.log('Listening on 3000'));