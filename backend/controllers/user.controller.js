const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { userModel } = require("../models/user.model")
const { blacklistModel } = require("../models/blacklist.model")

//User login route
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user._id, role: user.type, email: user.email }, process.env.privateKey, { expiresIn: '3h' });
                    res.status(200).send({ "msg": "Signin Success!", token, userID: user._id })
                } else {
                    res.status(400).send({ "msg": "Incorrect Password" })
                }
            });
        } else {
            res.status(404).send({ "msg": "No user found with given email" })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}

//User register route
exports.register = async (req, res) => {
    const { email, password, language, classGrade, type, subject } = req.body
    try {
        const user = await userModel.findOne({ email })

        if (user) {
            res.status(400).send({ "msg": "User already exist!" })
        } else {
            bcrypt.hash(password, 3).then(async (hash) => {
                const user = new userModel({ email, password: hash, language, classGrade, type, subject })
                await user.save()
                res.status(200).send({ "msg": "Registeration completed!" })
            });
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}

//User logout route
exports.logout = async (req, res) => {
    const { token } = req.params;
    console.log(token)
    try {
        let newBlacklistToken = new blacklistModel({ token: token });
        await newBlacklistToken.save();
        return res.send({ "msg": "Logout successful" });
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
}