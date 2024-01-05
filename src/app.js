const express = require("express");
const ProductManager = require("./Managers/productManager.js");
const handlebars = require("express-handlebars");
const { Server: ServerIO } = require("socket.io");
const productService = new ProductManager();

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));
const socketServer = new ServerIO(httpServer); 


const homeRouter = require("./Routes/home.router.js")(productService);
const realTimeProductsRouter = require("./Routes/realtimeproducts.router.js")(socketServer);
const productRouter = require("./Routes/products.router.js")(socketServer);
const cartRouter = require("./Routes/carts.router.js")(productService);

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use("/", homeRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/realtimeproducts", realTimeProductsRouter);

socketServer.on('connection', socket => {
    console.log("Se conectó un cliente");
    socketServer.emit("updateProductsList", productService.getProducts());
    socket.broadcast.emit('message-todos-menos-actual', "solo para ellos"); // lo reciben todos menos el que lo mandó
});
