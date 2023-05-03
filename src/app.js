const express = require('express');
const cors = require('cors')
const app = express();

//Settings

app.set('port',process.env.PORT || 4000);
  
//middlewares

app.use(cors());
app.use(express.json());

//Routes

app.use('/api/user', require('./routes/users.routes'));
app.use('/api/buyer', require('./routes/buyers.routes'));
app.use('/api/seller', require('./routes/sellers.routes'));
app.use('/api/product', require('./routes/product.routes'));




module.exports = app;