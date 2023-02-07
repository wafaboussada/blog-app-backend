const router = require("express").Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// register
router.post('/register', async (req, res) => {
    try {
        // const salt = await bcrypt.genSalt(20);
        // console.log('salt', salt);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log('hashedPassword', hashedPassword);
        // instruction1
        // instruction2
        // .....
        console.log('body', req.body);
    // const req.body = {
    //     username: "kjkjkj",
    //     email: "test@test.com",
    //     password: "jjfjhjfhkv"
    // }
    // const username = req.body.username;
    // const password = req.body.password;
    // const email = req.body.email;
    const {
        username,
        email,
        password,
    } = req.body;
    const user = User({
        username,
        email,
        password: hashedPassword,
    });
    const newUser = await user.save();
    console.log('newUser', newUser);
    res.status(200).json(newUser);
    } catch(err) {
        // bloc ddes erruerurs
        res.status(500).json(err);
    }
})

router.post('/login', async (req, res) => {
    try {
        const {
            userName,
            password,
        } = req.body;
        const user = await User.findOne({ username: userName});
        console.log('user', user);
        !user && res.status(400).json('wrong username !');
        // if (!user) {
        //     res.status(400).json('wrong username !');
        // }
        // username exist
        const validatedPassword = await bcrypt.compare(password, user.password);
        console.log('validatedPassword', validatedPassword);
        if (!validatedPassword) {
            res.status(400).json('wrong password !');
        }
        res.status(200).json(user);
    } catch(err) {
        // bloc ddes erruerurs
        res.status(500).json(err);
    }
})

module.exports = router;