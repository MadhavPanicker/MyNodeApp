const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const pageNotFoundRouter = require('./routes/page-not-found');

const sequelize = require('./utils/database');
const Product = require('./model/product');
const User = require('./model/user');
const Cart = require('./model/cart');
const CartItem = require('./model/cart-item');
const Order = require('./model/order');
const OrderItem = require('./model/order-item');

const app = express();

//app.engine('hbs',expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
app.set("view engine","ejs");
app.set("views","views");

/*db.execute('SELECT * FROM products').then(result=>{
    console.log(result);
});*/

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    });
});

app.use('/admin',adminRouter);

app.use(shopRouter);

app.use(pageNotFoundRouter);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, {through: OrderItem});

sequelize.sync()
.then(result => {
    return User.findByPk(1);
})
.then(user => {
    if(!user){
        return User.create({name: "Madhav", email: "madhav@gmail.com"});
    }
    return user;
})
.then(user => {
    return user.createCart();
})
.then(cart => {
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
});
