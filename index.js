// root file
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

const PORT = prcocess.env.PORT;
app.listen(5000);
