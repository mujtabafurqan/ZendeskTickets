const express = require('express');
const app = express();
const ticektRouter = require('./Routes/tickets.routes');

// app.use(express.static('dist'));
app.use(express.json());
app.use('/api/tickets', ticektRouter);
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

module.exports = app;

