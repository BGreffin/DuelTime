const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.use(cookieParser(),express.json(), express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin:'http://localhost:3000'}));
require("./config/mongoose.config");

const AllmyDuelistRoutes = require("./routes/duelist.route");
AllmyDuelistRoutes(app);

app.listen(8000, async () => console.log("The server is listening on port 8000")); 