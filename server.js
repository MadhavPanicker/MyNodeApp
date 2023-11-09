const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars');

const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');
const pageNotFoundRouter = require('./routes/page-not-found');

const app = express();

//app.engine('hbs',expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
app.set("view engine","ejs");
app.set("views","views");

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:false}));

app.use('/admin',adminData.routes);

app.use(shopRouter);

app.use(pageNotFoundRouter);

app.listen(3000);