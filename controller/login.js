const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwt: { secret } } = require('../config/tokenConfig.json');

async function hashPassword(password){
    const salt =  bcrypt.genSalt(10);
    return  bcrypt.hash(password, salt);
}

async function validatePassword(plainPassword, hashedPassword){
    return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup =  (req, res, next) =>{
    try{
        const{ username, password, role } = req.body
        const hashedPassword =  hashPassword(password);
        const newUser = new User({ username, password: hashedPassword, role: role || "basic"});
        res.json({
            data: newUser,
        })
    } catch (err){
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username});
        if(!user) return next(new Error("Username Does not exist"));
        const validPassword = await validatePassword(password, user.password);
        if(!validPassword) return next(new Error("Password is not correct"))
        const accessToken = jwt.sign({ userId: user._id}, secret, {
            expiresIn: "1d"
        });
        await User.findByIdAndUpdate(user._id, { accessToken })
        res.status(200).json({
            data: { email: user.email, role: user.role },
            accessToken
        })
    } catch(err){
        next(err);
    }
}



const { roles } =require('../roles')

exports.grantAccess = function(action, resource){
    return async (req, res, next) =>{
        try{
            const permission = roles.can(req.user.role)[action](resource);
            if(!permission.granted){
                return res.status(401).json({
                    err: "You don't have the required permissions for this"
                });
            }
            next()
        } catch(err){
            next(err)
        }
    }
}

exports.allowIfLoggedin = async (req, res, next) => {
    try{
        const user = res.locals.loggedInUser;
        if(!user)
        return res.status(401).json({
            err: "You need to log in"
        });
        req.user=user;
        next();
    } catch(err) {
        next(err);
    }
}