// const http = require('http');
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");

const app = express();

// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// );
// app.set("view engine", "pug");
// app.set("view engine", "hbs");
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // res.status(404).send('<h1>Page noy found</h1>');
  // res.status(404).sendFile(path.join(__dirname,'views','404.html'));
  res.status(404).render("404", { docTitle: "Page not found" });
});

// app.use('/',(req, res, next)=>{
//     console.log("this always run");
//     next();
// });

// app.use('/add-product',(req, res, next)=>{
//     res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
// })

// app.post('/product',(req, res, next)=>{
//     console.log(req.body);
//     res.redirect('/');
// })

// app.use('/',(req, res, next)=>{
//     console.log("In the second middleware!!")
//     res.send('<h1>HTML from express!!</h1>');
// })
app.listen(3000);
// const server = http.createServer(app);

// server.listen(3000);
