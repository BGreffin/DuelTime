const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(cookieParser(),express.json(), express.urlencoded({ extended: true }));
app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, HEAD, DELETE");
    next(); })
app.use(cors({credentials: false, origin:'http://localhost:3000'}))
require("./config/mongoose.config");

const AllmyDuelistRoutes = require("./routes/duelist.route");
AllmyDuelistRoutes(app);

app.listen(8000, async () => console.log("The server is listening on port 8000")); 