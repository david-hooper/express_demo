const express = require('express');
const PORT = 3001;

const app = express();

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`your front end server that serves up static files, is listening on ${PORT}`);
})