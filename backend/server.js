const express = require('express');
const bodyParser = require('body-parser');
const loginRoutes = require('./login.js');
const imageRoutes = require('./image.js');
const itemRoutes  = require('./item.js');
const cors=require('cors');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(cors({
  origin:"*"
}));
app.use('/uploads', express.static('uploads'));
app.use(loginRoutes);
app.use(imageRoutes);
app.use(itemRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Social App');
});
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});