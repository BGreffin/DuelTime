const Duelist = require('../models/duelist.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports.login = async(req,res) => {
    try {
        //Verify valid username
        if (req.body.userName === null) {
            return res.status(400).json({msg: 'Username required'});
            };
        
        //Find duelist 
        duelist = await Duelist.findOne({userName: req.body.userName});
            
        //If duelist doesn't exist
        if (!duelist) 
            {return res.status(400).json({msg:'Invalid Username'})};

        //Verify Password
        const isMatch = await bcrypt.compare(req.body.password,duelist.password)
        if (!isMatch) {
            return res.status(400).json({msg:'Incorrect Password'})
        }; 

        //Create cookie
        const payload = {id: duelist._id, userName: duelist.userName};
        const token = jwt.sign(payload, process.env.SECRET_KEY)
        duelist.token = token;
        //console.log(token)
        return res.cookie('token',token,{ httpOnly: true/*, sameSite: 'none', secure: false */}).json({msg:"Login Successful!", token: token, duelist: duelist});
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({msg:'Server Error'});
    }
}

module.exports.register = async(req,res) => {
    try {
        //Find duelist 
        duelist = await Duelist.findOne({userName: req.body.userName});
            
        //If duelist doesn't exist
        if (duelist) 
            {return res.status(400).json({errors: {userName:'username is not available'}})};
        
        //create duelist
        Duelist.create(req.body)
            .then(rduelist=> {
                const payload = {id: rduelist._id, userName: rduelist.userName};
                //Create cookie
                const token = jwt.sign(payload, process.env.SECRET_KEY);
                rduelist.token = token;
                res.cookie("token",token,{ httpOnly: true})
                res.json({msg:"Registration Successful", rduelist: rduelist})}
                )
            .catch((err) => {res.status(400).json(err)})
    }
    catch(err) { 
        console.log(err)
        res.status(500).json({msg: 'Server Error'})
    }

}

module.exports.logout = (req,res) => {
    res.clearCookie('token');
    res.sendStatus(200);
}

module.exports.findAllDuelists = (req,res) => {
    Duelist.find({})
        .then((AllDuelists) => res.json(AllDuelists))
        .catch((err) => res.status(400).json({err}))
}

module.exports.findOneDuelist = (req,res) => {
    Duelist.findOne({userName:req.params.userName})
        .then((oneDuelist) => res.json(oneDuelist))
        .catch((err) => res.status(400).json({err}))
}

module.exports.createDuelist = (req,res) => {
    Duelist.create(req.body)
        .then((newDuelist) => res.json({msg:'Successfully added new duelist!',newDuelist: newDuelist}))
        .catch((err) => res.status(400).json({err}))
}

module.exports.updateDuelist = (req,res) => {
    Duelist.findByIdAndUpdate({userName:req.params.userName},req.body,{new:true,runValidators:true})
        .then(OneUpdate => res.json(OneUpdate))
        .catch((err) => res.status(400).json({err}))
}

module.exports.deleteDuelist = (req,res) => {
    Duelist.deleteOne({userName: req.params.userName})
        .then(result => res.json(result))
        .catch((err) => res.status(400).json({err}))
}

module.exports.deleteDuelist2 = (req,res) => {
        Duelist.deleteOne({_id: req.params.id})
            .then(result => res.json(result))
            .catch((err) => res.status(400).json({err}))
}
