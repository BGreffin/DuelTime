const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_KEY;

module.exports.secret = secret;

module.exports.auth = (req, res, next) => {
    try{
    const token = req.cookies.token;
    const token2 = req.headers['token'];
    const token3 = document.cookie;
    console.log("Middleware reads token3 as: ",token3);
    console.log("Middleware reads token2 as: ",token2);
    console.log("Middleware reads token as: ",token);

    if(!token) {
        return res.status(401).json({msg:"Authorization Denied",verified: false});
    }

        const decoded = jwt.verify(token, secret); 
        console.log("point A");
        req.id = decoded.id;
        req.userName = decoded.userName;
        console.log("point B");
        return next();
    }
    catch (err) {
        return res.status(500).json({msg:"Server Error"});
    }
}

