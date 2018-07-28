// root file
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

const PORT = prcocess.env.PORT || 5000;
app.listen(PORT);
